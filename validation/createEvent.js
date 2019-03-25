const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateEventInput(data) {
  let errors = {};


  data.name = !isEmpty(data.name) ? data.name : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.createdBy = !isEmpty(data.createdBy) ? data.createdBy : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Event name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Event Name field is required";
  }

  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = "Event start date field is required";
  }


  if (Validator.isEmpty(data.type)) {
    errors.type = "Type field is required";
  }
  
  if (Validator.isEmpty(data.createdBy)) {
    errors.createdBy = "Created by field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
