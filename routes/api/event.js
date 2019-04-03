const validateCreateEventInput = require("../../validation/createEvent"),
  express = require("express"),
  router = express.Router(),
  Event = require("../../models/Event"),
  passport = require("passport"),
  utils = require("../../utils"),
  isEmpty = require("../../validation/is-empty");

// @route    POST /api/event/new
// @desc     create a new event
// @access   Private
router.post("/new", async (req, res) => {
  const { errors, isValid } = validateCreateEventInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const eventOwner = await utils.eventUtilities.getEventCreatorByUsername(
      req.body.createdBy
    );

    const attendeesToAdd = await utils.eventUtilities.getEventAttendees(
      eventOwner,
      utils.parseStringToBool(req.body.shared),
      req.body.attendees
    );

    const newEventData = {
      name: req.body.name,
      createdBy: eventOwner,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description,
      type: req.body.type,
      location: req.body.location,
      attendees: attendeesToAdd,
      shared: req.body.shared
    };

    const newEvent = await Event.create(newEventData);

    res.json({ newEvent });
  } catch (err) {
    errors.error = err.message;
    res.status(400).json(errors);
  }
});

// @route    GET /api/event/all
// @desc     Get all events associated with current logged in user (both owned and attended)
// @access   Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const currentUser = await utils.eventUtilities.getEventCreatorByUsername(
        req.user.userName
      );

      const usersEvents = await Event.find({ attendees: currentUser });

      res.json(usersEvents);
    } catch (err) {
      errors.error = err.message;
      res.status(404).json(errors);
    }
  }
);

// @route    GET /api/event/:id
// @desc     Get a single event if current user is an attendee
// @access   Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const currentUser = await utils.eventUtilities.getEventCreatorByUsername(
        req.user.userName
      );

      const foundEvent = await Event.find({
        attendees: currentUser,
        _id: req.params.id
      });

      if (isEmpty(foundEvent)) {
        throw new Error();
      }

      res.json(foundEvent);
    } catch (err) {
      errors.error = "Event Not Found";
      res.status(404).json(errors);
    }
  }
);

// @route    PUT /api/event/:id/edit
// @desc     update an event
// @access   Private
router.put(
  "/:id/edit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCreateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const currentUser = await utils.eventUtilities.getEventCreatorByUsername(
        req.user.userName
      );

      const foundEvent = await Event.find({
        createdBy: currentUser,
        _id: req.params.id
      });

      if (isEmpty(foundEvent)) {
        throw new Error();
      }

      const attendeesToAdd = await utils.eventUtilities.getEventAttendees(
        currentUser,
        utils.parseStringToBool(req.body.shared),
        req.body.attendees
      );

      console.log(foundEvent);

      const updatedEventData = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        createdBy: currentUser,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        description: req.body.description,
        type: req.body.type,
        location: req.body.location,
        attendees: attendeesToAdd,
        shared: req.body.shared
      };

      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        updatedEventData
      );

      res.json(updatedEvent);
    } catch (err) {
      errors.error = "Unable to edit specified event";
      res.status(404).json(errors);
    }
  }
);

// @route    DELETE /api/event/:id/delete
// @desc     delete an event
// @access   Private
router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const currentUser = await utils.eventUtilities.getEventCreatorByUsername(
        req.user.userName
      );

      const foundEvent = await Event.find({
        createdBy: currentUser,
        _id: req.params.id
      });

      if (isEmpty(foundEvent)) {
        throw new Error();
      }

      const deletedEvent = await Event.findOneAndRemove({
        _id: req.params.id
      });

      res.status(200).json({ status: "success" });
    } catch (err) {
      errors.error = "Unable to delete specified event";
      res.status(401).json(errors);
    }
  }
);

module.exports = router;
