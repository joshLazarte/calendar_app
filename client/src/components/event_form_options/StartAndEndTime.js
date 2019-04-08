import React from "react";
import InputGroup from "../common/InputGroup";

const StartAndEndTime = props => {
  return (
    <div className="form-group row">
      <div className="col-sm-6">
        <label htmlFor="startTime">Start Time</label>
        <InputGroup
          placeholder="Start Time"
          name="startTime"
          values={props.values[0]}
          onChange={props.onChange}
          error={props.error}
        />
      </div>
      <div className="col-sm-6">
        <label htmlFor="endTime">End Time</label>
        <InputGroup
          placeholder="End Time"
          name="endTime"
          values={props.values[1]}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default StartAndEndTime;
