import React from "react";
import PropTypes from "prop-types";

const AttendeeButton = props => {
  let attendeeButton;

  if (props.disabled) {
    attendeeButton = null;
  } else if (props.attendeeLoading) {
    attendeeButton = (
      <a
        href="!#"
        onClick={e => e.preventDefault()}
        className="btn btn-primary ml-1"
      >
        <i className="fas fa-circle-notch fa-spin" />
      </a>
    );
  } else if (props.attendee) {
    attendeeButton = (
      <a
        href="!#"
        onClick={props.onDeleteClick}
        value={props.attendee}
        className="btn btn-danger ml-1"
      >
        <i className="fas fa-ban" />
      </a>
    );
  } else {
    attendeeButton = (
      <a
        href="!#"
        onClick={props.onAddAttendeeClick}
        className="btn btn-primary ml-1"
      >
        <i className="fas fa-plus" />
      </a>
    );
  }

  return <span>{attendeeButton}</span>;
};

AttendeeButton.propTypes = {
  attendeeLoading: PropTypes.bool.isRequired,
  attendee: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onAddAttendeeClick: PropTypes.func,
  disabled: PropTypes.bool.isRequired
};

AttendeeButton.defaultProps = {
  attendeeLoading: false,
  disabled: false
};

export default AttendeeButton;
