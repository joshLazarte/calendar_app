import React from "react";
import AttendeeButton from "./AttendeeButton";
import InputGroup from "../common/InputGroup";

const AttendeeFields = props => {
  return (
    <div className="row">
      {props.stagedAttendees.map(attendee => (
        <div key={attendee} className="col-sm-6 d-flex align-items-start pt-3">
          <InputGroup value={attendee} disabled={true} name={attendee} />
          <AttendeeButton
            attendee={attendee}
            onDeleteClick={props.onDeleteClick}
            disabled={props.disabled}
          />
        </div>
      ))}

      {!props.disabled && (
        <div className="col-sm-6 d-flex align-items-start pt-3">
          <InputGroup
            placeholder="Attendee"
            name="attendeeSearchField"
            value={props.attendeeSearchField}
            onChange={props.onChange}
            error={props.errors.attendees}
            disabled={props.disabled}
          />
          <AttendeeButton
            attendeeLoading={props.attendeeLoading}
            onAddAttendeeClick={props.onAddAttendeeClick}
            disabled={props.disabled}
          />
        </div>
      )}
    </div>
  );
};

export default AttendeeFields;
