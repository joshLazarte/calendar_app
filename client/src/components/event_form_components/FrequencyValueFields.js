import React from "react";
import Single from "../event_form_components/Single";
import MultiDay from "../event_form_components/MultiDay";
import Weekly from "../event_form_components/Weekly";
import BiWeekly from "../event_form_components/BiWeekly";
import Monthly from "../event_form_components/Monthly";
import moment from "moment";

const format = date => {
  return moment(date)
    .utc()
    .format("YYYY-MM-DD");
};

const displayCorrectFields = (props, onChange) => {
  switch (props.frequency) {
    case "single":
      return (
        <Single
          value={format(props.startDate)}
          onChange={onChange}
          error={props.errors.startDate}
          disabled={props.disabled}
        />
      );
    case "multi-day":
      return (
        <MultiDay
          values={[format(props.startDate), format(props.endDate)]}
          onChange={onChange}
          errors={[props.errors.startDate, props.errors.endDate]}
          disabled={props.disabled}
        />
      );
    case "weekly":
      return (
        <Weekly
          value={props.weeklyDay}
          onChange={onChange}
          error={props.errors.weeklyDay}
          disabled={props.disabled}
        />
      );
    case "bi-weekly":
      return (
        <BiWeekly
          values={[props.biWeeklySchedule, props.biWeeklyDay]}
          onChange={onChange}
          errors={[props.errors.biWeeklySchedule, props.errors.biWeeklyDay]}
          disabled={props.disabled}
        />
      );
    case "monthly":
      return (
        <Monthly
          values={[
            props.monthlyType,
            props.monthlyDate,
            props.monthlySchedule,
            props.monthlyDay
          ]}
          onChange={onChange}
          errors={[
            props.errors.monthlyType,
            props.errors.monthlyDate,
            props.errors.monthlySchedule,
            props.errors.monthlyDay
          ]}
          disabled={props.disabled}
        />
      );
    default:
      return null;
  }
};

const FrequencyValueFields = properties => {
  const { props, onChange } = properties;
  return <span>{displayCorrectFields(props, onChange)}</span>;
};

export default FrequencyValueFields;
