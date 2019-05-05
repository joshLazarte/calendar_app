import React from "react";

const FormActionButton = props => {
  let onClick, type, className, text;

  if (props.formType === "ADD") {
    type = "submit";
    className = "btn btn-primary btn-block";
    text = "Add Event";
    onClick = null;
  } else if (props.formType === "READONLY" && props.userOwnsEvent) {
    onClick = props.setEditState;
    type = "button";
    className = "btn btn-warning btn-block";
    text = "Edit Event";
  } else if (props.formType === "READONLY" && !props.userOwnsEvent) {
    onClick = props.removeUser;
    type = "button";
    className = "btn btn-danger btn-block";
    text = "Remove Me From Event";
  } else if (props.formType === "EDIT") {
    type = "submit";
    className = "btn btn-primary btn-block";
    text = "Update Event";
    onClick = null;
  }

  return (
    <button onClick={onClick} type={type} className={className}>
      {text}
    </button>
  );
};

export default FormActionButton;
