const validateCreateEventInput = require("../../validation/createEvent"),
  express = require("express"),
  router = express.Router(),
  Event = require("../../models/Event"),
  User = require("../../models/Users"),
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

    const newEventData = {};
    newEventData.name = req.body.name;
    newEventData.createdBy = eventOwner;
    newEventData.startDate = req.body.startDate;
    newEventData.attendees = attendeesToAdd;
    newEventData.shared = req.body.shared;
    newEventData.frequency = req.body.frequency;
    if(req.body.endDate) newEventData.endDate = req.body.endDate;
    if(req.body.startTime) newEventData.startTime = req.body.startTime;
    if(req.body.endTime) newEventData.endTime = req.body.endTime;
    if(req.body.description) newEventData.description = req.body.description;
    if(req.body.biWeeklySchedule) newEventData.biWeeklySchedule = req.body.biWeeklySchedule;
    if(req.body.biWeeklyDay) newEventData.biWeeklyDay = req.body.biWeeklyDay;
    if(req.body.weeklyDay) newEventData.weeklyDay = req.body.weeklyDay;
    if(req.body.monthlyType) newEventData.monthlyType = req.body.monthlyType;
    if(req.body.monthlyDate) newEventData.monthlyDate = req.body.monthlyDate;
    if(req.body.monthlySchedule) newEventData.monthlySchedule = req.body.monthlySchedule;
    if(req.body.monthlyDay) newEventData.monthlyDay = req.body.monthlyDay;
    if(req.body.location) newEventData.location = req.body.location;

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

      if (isEmpty(foundEvent)) throw new Error();
      
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

// @route    GET /api/event/attendee/:userName
// @desc     
// @access   Private
router.get('/attendee/:userName',
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const attendee = await User.findOne({lower_case_username: req.params.userName.toLowerCase()});
      
      if(isEmpty(attendee)) throw new Error();
      
      res.status(200).json(attendee.userName);
    } catch(err) {
      errors.error = 'That attendee does not exist';
      res.status(404).json(errors);
    }
});

// @route    DELETE /api/event/:id/attendee/:userName/delete
// @desc     remove attendee from event
// @access   Private
router.delete('/:id/attendee/:userName/delete',
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const event = await Event.findOne({_id: req.params.id});
      
      if(event.createdBy.userName === req.params.userName) {
        
        errors.invalid = 'You cannot remove yourself from an event you created';
        res.status(400).json(errors);
        
      } else if(event.createdBy.userName === req.user.userName || req.user.userName === req.params.userName) {
        
      const updatedEventData = utils.eventUtilities.removeAttendeeFromEvent(req.params.userName, event);
        
      const updatedEvent = await Event.findByIdAndUpdate(
          req.params.id,
          updatedEventData
      );
      
      res.json({status: 'success'});
      
      } else {
        errors.unauthorized = 'You are not authorized to remove that attendee';
        res.status(400).json(errors);
      }
      
    } catch(err) {
      errors.error = 'Unable to remove attendee';
      res.status(400).json(errors);
    }
});

module.exports = router;