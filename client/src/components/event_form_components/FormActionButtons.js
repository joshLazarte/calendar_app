import React from "react";
import DeleteEventButton from "./DeleteEventButton";

const FormActionButtons = props => {
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
    onClick = () => props.askConfirm("REMOVE_USER");
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
    <div className="form-group my-5">
      <button onClick={onClick} type={type} className={className}>
        {text}
      </button>
      <DeleteEventButton
        formType={props.formType}
        userOwnsEvent={props.userOwnsEvent}
        onClick={props.askConfirm}
      />
    </div>
  );
};

export default FormActionButtons;
