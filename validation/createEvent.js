const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateEventInput(data) {
  let errors = {};


  data.name = !isEmpty(data.name) ? data.name : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.frequency = !isEmpty(data.frequency) ? data.frequency : "";
  data.createdBy = !isEmpty(data.createdBy) ? data.createdBy : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Event name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Event Name field is required";
  }
  
  if (Validator.isEmpty(data.frequency)) {
    errors.frequency = "Frequency field is required";
  }
  
  if (Validator.isEmpty(data.createdBy)) {
    errors.createdBy = "Created by field is required";
  }
  
  
  if(data.frequency === "single") {
    if (Validator.isEmpty(data.startDate)) {
      errors.startDate = "Event date field is required";
    }
  }
  
  
  if(data.frequency === "multi-day") {
    if(Validator.isEmpty(data.startDate)) {
      errors.startDate = "Event start date field is required";
    } else if(Validator.isEmpty(data.endDate)) {
      errors.endDate = "Event end date field is required";
    }
  }
  
  if(data.frequency === "weekly") {
    if(Validator.isEmpty(data.weeklyDay)) {
       errors.weeklyDay = "Weekday field is required";
    }
  }
  
  if(data.frequency === "bi-weekly") {
    if(Validator.isEmpty(data.biWeeklySchedule)) {
       errors.biWeeklySchedule = "Bi-weekly schedule field is required";
    } else if(Validator.isEmpty(data.biWeeklyDay)) {
      errors.biWeeklyDay = "Weekday field is required";
    }
  }
  
  if(data.frequency === "monthly") {
    if(Validator.isEmpty(data.monthlyType)) {
      errors.monthlyType = "Monthly type field is required";
    }
    
    if(data.monthlyType === "byDate" && Validator.isEmpty(data.monthlyDate)) {
      errors.monthlyDate = "Date field is required";
    }
    
    if(data.monthlyType === "byDay") {
      if(Validator.isEmpty(data.MonthlySchedule )) {
         errors.MonthlySchedule  = "Monthly schedule field is required";
      } else if(Validator.isEmpty(data.monthlyDay)) {
        errors.monthlyDay = "Weekday field is required";
      }
    }
  }
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
