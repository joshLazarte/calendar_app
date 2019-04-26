const Validator = require("validator");
const isEmpty = require("./is-empty");
const utils = require("../utils");

module.exports = function validateCreateEventInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.endDate = !isEmpty(data.endDate) ? data.endDate : "";
  data.frequency = !isEmpty(data.frequency) ? data.frequency : "";
  data.createdBy = !isEmpty(data.createdBy) ? data.createdBy : "";
  data.weeklyDay = !isEmpty(data.weeklyDay) ? data.weeklyDay : "";
  data.biWeeklySchedule = !isEmpty(data.biWeeklySchedule)
    ? data.biWeeklySchedule
    : "";
  data.biWeeklyDay = !isEmpty(data.biWeeklyDay) ? data.biWeeklyDay : "";
  data.monthlyType = !isEmpty(data.monthlyType) ? data.monthlyType : "";
  data.monthlyDate = !isEmpty(data.monthlyDate) ? data.monthlyDate : "";
  data.monthlySchedule = !isEmpty(data.monthlySchedule)
    ? data.monthlySchedule
    : "";
  data.monthlyDay = !isEmpty(data.monthlyDay) ? data.monthlyDay : "";
  data.attendees = !isEmpty(data.attendees) ? data.attendees : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Event Name field is required";
  }

  if (Validator.isEmpty(data.frequency)) {
    errors.frequency = "Frequency field is required";
  }

  if (Validator.isEmpty(data.createdBy)) {
    errors.createdBy = "Created by field is required";
  }

  if (data.frequency === "single") {
    if (Validator.isEmpty(data.startDate)) {
      errors.startDate = "Event date field is required";
    }
  }

  if (data.frequency === "multi-day") {
    if (Validator.isEmpty(data.startDate)) {
      errors.startDate = "Event start date field is required";
    } else if (Validator.isEmpty(data.endDate)) {
      errors.endDate = "Event end date field is required";
    } else if (
      new Date(data.startDate).getTime() > new Date(data.endDate).getTime()
    ) {
      errors.startDate = "Start date must be before end date";
    }
  }

  if (data.frequency === "weekly") {
    if (Validator.isEmpty(data.weeklyDay)) {
      errors.weeklyDay = "Weekday field is required";
    }
  }

  if (data.frequency === "bi-weekly") {
    if (Validator.isEmpty(data.biWeeklySchedule)) {
      errors.biWeeklySchedule = "Bi-weekly schedule field is required";
    } else if (Validator.isEmpty(data.biWeeklyDay)) {
      errors.biWeeklyDay = "Weekday field is required";
    }
  }

  if (data.frequency === "monthly") {
    if (Validator.isEmpty(data.monthlyType)) {
      errors.monthlyType = "Monthly type field is required";
    }

    if (data.monthlyType === "by date" && Validator.isEmpty(data.monthlyDate)) {
      errors.monthlyDate = "Date field is required";
    }

    if (data.monthlyType === "by day") {
      if (Validator.isEmpty(data.monthlySchedule)) {
        errors.monthlySchedule = "Monthly schedule field is required";
      } else if (Validator.isEmpty(data.monthlyDay)) {
        errors.monthlyDay = "Weekday field is required";
      }
    }
  }

  if (utils.parseStringToBool(data.shared)) {
    if (Validator.isEmpty(data.attendees)) {
      errors.attendees = "Add an attendee or uncheck 'Share This Event'";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
