import React from "react";
import SelectInputGroup from "../common/SelectInputGroup";

const Monthly = props => {
  const byDateOptions;

  const byWeekdayOptions;

  return (
    <div className="form-group row">
      <div className="col-sm-6">
        <label htmlFor="startDate">Monthly Type</label>
        <SelectInputGroup
          name="typeOption"
          options={["By Date", "By Weekday"]}
          value={this.state.typeOption}
          onChange={this.onChange}
          error={props.error}
        />
      </div>
      <div className="col-sm-6">
        <label htmlFor="endDate">End Date</label>
        <SelectInputGroup
          name="typeOption"
          options={[
            "Event Type",
            "Single",
            "Multi-Day",
            "Weekly",
            "Bi-Weekly",
            "Monthly"
          ]}
          value={this.state.typeOption}
          onChange={this.onChange}
          error={errors.type}
        />
      </div>
    </div>
  );
};

export default Monthly;
