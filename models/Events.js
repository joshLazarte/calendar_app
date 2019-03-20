const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
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
        type: String
    },
    shared: {
        type: Boolean,
        default: false
    }
 });

const Events = mongoose.model("Events", eventsSchema);

module.exports = Events;