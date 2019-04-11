import React from "react";
import SelectInputGroup from "../common/SelectInputGroup";
import PropTypes from "prop-types";

const Weekly = props => {
  return (
    <div className="form-group row">
      <label className="col-form-label col-sm-3" htmlFor="startDate">
        Weekday
      </label>
      <div className="col-sm-8">
        <SelectInputGroup
          name="weeklyDay"
          options={[
            "Choose One",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ]}
          value={props.value}
          onChange={props.onChange}
          readOnly={props.readOnly}
          error={props.error}
        />
      </div>
    </div>
  );
};

Weekly.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default Weekly;
