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
    frequency: {
        type: String,
        required: true
    },
    biWeeklySchedule: {
        type: String
    },
    biWeeklyDay: {
        type: String
    },
    weeklyDay: {
        type: String
    },
    monthlyType: {
        String
    },
    monthlyDate: {
        type: String
    },
    monthlySchedule: {
        type: String
    },
    monthlyDay: {
        type: String
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