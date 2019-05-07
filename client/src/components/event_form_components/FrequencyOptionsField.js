import React from "react";
import SelectInputGroup from "../common/SelectInputGroup";

const FrequencyOptionsField = props => {
  return (
    <div className="form-group row">
      <label className="col-form-label col-sm-3" htmlFor="frequency">
        Frequency
      </label>
      <div className="col-sm-8">
        <SelectInputGroup
          name="frequency"
          options={[
            "Choose One",
            "Single",
            "Multi-Day",
            "Weekly",
            "Bi-Weekly",
            "Monthly"
          ]}
          disabled={props.disabled}
          value={props.frequency}
          onChange={props.onChange}
          error={props.errors.frequency}
        />
      </div>
    </div>
  );
};

export default FrequencyOptionsField;
