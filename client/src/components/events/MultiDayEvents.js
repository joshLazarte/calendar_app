import React from "react";
import moment from "moment";
import isEmpty from "../../validation/is-empty";

const format = date => {
  return moment(date)
    .utc()
    .format("YYYY-MM-DD");
};

const match = (a, b) => a === b;

const MultiDayEvents = props => {
  if (isEmpty(props.events)) {
    return <span />;
  } else {
    return props.events.map((event, index) => {
      return (
        <div key={index}>
          <a
            key={event._id}
            href="!#"
            className={
              "calendar-event text-white d-block p-1 mb-1 mx-auto bg-success"
            }
            onClick={props.onClick(event)}
          >
            {match(format(event.startDate), format(props.date))
              ? event.name
              : "\u00A0"}
          </a>
        </div>
      );
    });
  }
};

export default MultiDayEvents;
