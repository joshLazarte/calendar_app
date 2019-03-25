const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Object,
        required: true
    },
    endDate: {
        type: Date
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    attendees: {
        type: Array
    },
    shared: {
        type: Boolean,
        default: false
    }
 });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;