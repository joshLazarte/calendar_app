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

// @route    GET /api/event/id/:id
// @desc     Get a single event if current user is an attendee
// @access   Private
router.get(
  "/id/:id",
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

module.exports = router;
