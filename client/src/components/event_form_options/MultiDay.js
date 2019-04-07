import React from "react";
import InputGroup from "../common/InputGroup";

const MultiDay = props => {
  return (
    <div className="form-group row">
      <div className="col-sm-6">
        <label htmlFor="startDate">Start Date</label>
        <InputGroup
          placeholder="Start Date"
          name="startDate"
          type="Date"
          value={props.values[0]}
          onChange={props.onChange}
          error={props.errors[0]}
        />
      </div>
      <div className="col-sm-6">
        <label htmlFor="endDate">End Date</label>
        <InputGroup
          placeholder="End Date"
          name="endDate"
          type="Date"
          value={props.values[1]}
          onChange={props.onChange}
          error={props.errors[1]}
        />
      </div>
    </div>
  );
};

export default MultiDay;
