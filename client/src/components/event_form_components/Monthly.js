import React from "react";
import SelectInputGroup from "../common/SelectInputGroup";
import PropTypes from "prop-types";

const Monthly = props => {
  const getOrdinal = n => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const monthlyDates = [];

  for (let i = 1; i <= 31; i++) {
    monthlyDates.push(getOrdinal(i));
  }

  let monthlyOptions;
  let monthlyFrequency;

  if (props.values[0] === "by date") {
    monthlyOptions = (
      <div className="col-sm-4">
        <label htmlFor="monthlyDate">Date</label>
        <SelectInputGroup
          name="monthlyDate"
          options={["Choose One", ...monthlyDates]}
          value={props.values[1]}
          onChange={props.onChange}
          disabled={props.disabled}
          error={props.errors[1]}
        />
      </div>
    );
  } else if (props.values[0] === "by day") {
    monthlyOptions = (
      <div className="col-sm-4">
        <label htmlFor="monthlySchedule">Every</label>
        <SelectInputGroup
          name="monthlySchedule"
          options={["Choose One", "1st", "2nd", "3rd", "4th"]}
          value={props.values[2]}
          onChange={props.onChange}
          disabled={props.disabled}
          error={props.errors[2]}
        />
      </div>
    );
    monthlyFrequency = (
      <div className="col-sm-4">
        <label htmlFor="monthlyDay">Weekday</label>
        <SelectInputGroup
          name="monthlyDay"
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
          value={props.values[3]}
          onChange={props.onChange}
          disabled={props.disabled}
          error={props.errors[3]}
        />
      </div>
    );
  }
  return (
    <div className="form-group row">
      <div className="col-sm-4">
        <label htmlFor="monthlyType">Monthly Type</label>
        <SelectInputGroup
          name="monthlyType"
          options={["Choose One", "By Date", "By Day"]}
          value={props.values[0]}
          onChange={props.onChange}
          disabled={props.disabled}
          error={props.errors[0]}
        />
      </div>
      {monthlyOptions} {monthlyFrequency}
    </div>
  );
};

Monthly.propTypes = {
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.array
};

export default Monthly;
