import React from "react";
import InputGroup from "../common/InputGroup";
import PropTypes from "prop-types";

const StartAndEndTime = props => {
  return (
    <div className="form-group row">
      <div className="col-sm-6">
        <label htmlFor="startTime">Start Time</label>
        <InputGroup
          placeholder="Start Time"
          name="startTime"
          value={props.values[0]}
          onChange={props.onChange}
          error={props.error}
          disabled={props.disabled}
        />
      </div>
      <div className="col-sm-6">
        <label htmlFor="endTime">End Time</label>
        <InputGroup
          placeholder="End Time"
          name="endTime"
          value={props.values[1]}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

StartAndEndTime.propTypes = {
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default StartAndEndTime;
