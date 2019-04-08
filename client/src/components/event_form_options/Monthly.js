import React from "react";
import SelectInputGroup from "../common/SelectInputGroup";

const Monthly = props => {
  const monthlyDates = [];

  for (let i = 1; i <= 31; i++) {
    monthlyDates.push(i.toString());
  }

  let monthlyOptions;
  let monthlyFrequency;

  if (props.values[0] === "By Date") {
    monthlyOptions = (
      <div className="col-sm-4">
        <label htmlFor="monthlyDate">Date</label>
        <SelectInputGroup
          name="monthlyDate"
          options={["Choose One", ...monthlyDates]}
          value={props.values[1]}
          onChange={props.onChange}
          readOnly={props.readOnly}
          error={props.errors[1]}
        />
      </div>
    );
  } else if (props.values[0] === "By Weekday") {
    monthlyOptions = (
      <div className="col-sm-4">
        <label htmlFor="monthlyWeekday">Every</label>
        <SelectInputGroup
          name="monthlyWeekday"
          options={["Choose One", "1st", "2nd", "3rd", "4th"]}
          value={props.values[2]}
          onChange={props.onChange}
          readOnly={props.readOnly}
          error={props.errors[2]}
        />
      </div>
    );
    monthlyFrequency = (
      <div className="col-sm-4">
        <label htmlFor="monthlyFrequency">Weekday</label>
        <SelectInputGroup
          name="monthlyFrequency"
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
          readOnly={props.readOnly}
          error={props.errors[3]}
        />
      </div>
    );
  }

  return (
    <div className="form-group row">
      <div className="col-sm-4">
        <label htmlFor="startDate">Monthly Type</label>
        <SelectInputGroup
          name="monthlyTypeOption"
          options={["Choose One", "By Date", "By Weekday"]}
          value={props.values[0]}
          onChange={props.onChange}
          readOnly={props.readOnly}
          error={props.errors[0]}
        />
      </div>
      {monthlyOptions} {monthlyFrequency}
    </div>
  );
};

export default Monthly;
