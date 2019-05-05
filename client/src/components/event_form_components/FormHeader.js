import React from "react";

const getFormHeaderContent = formType => {
  switch (formType) {
    case "READONLY":
      return "View Event";
    case "EDIT":
      return "Edit Event";
    default:
      return "Add Event";
  }
};

const FormHeader = props => {
  return (
    <h1 className="text-center">{getFormHeaderContent(props.formType)}</h1>
  );
};

export default FormHeader;
