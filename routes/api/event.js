const validateCreateEventInput = require("../../validation/createEvent"),
      express = require('express'),
      router = express.Router(),
      Event = require('../../models/Event'),
      User  = require('../../models/Users'),
      utils = require('../../utils');
         
      
// @route    POST /api/event/new
// @desc     create a new event
// @access   Private
router.post('/new', async (req, res) => {
    const { errors, isValid } = validateCreateEventInput(req.body);

    if (!isValid) {
       return res.status(400).json(errors);
    }
    
    try {
        const eventOwner = await utils.eventUtilities.getEventCreator(req.body.createdBy);
        
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
        
        res.json({newEvent});
       
    } catch(err) {
        errors.error = err.message;
        res.status(400).json(errors);
    }
});
      
module.exports = router;