import React from "react";
import InputGroup from "../common/InputGroup";

const Single = props => {
  return (
    <div className="form-group row">
      <label className="col-form-label col-sm-3" htmlFor="startDate">
        Date
      </label>
      <div className="col-sm-8">
        <InputGroup
          placeholder="Date"
          name="startDate"
          type="Date"
          value={props.value}
          onChange={props.onChange}
          readOnly={props.readOnly}
          error={props.error}
        />
      </div>
    </div>
  );
};

export default Single;
