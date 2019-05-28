import React from "react";
import moment from "moment";
import isEmpty from "../../validation/is-empty";

const format = date => {
  return moment(date)
    .utc()
    .format("YYYY-MM-DD");
};

const insertBlankSpaces = (num, target) => {
  const blankSpace = (
    <div key={Date.now()} className="mb-1">
      &nbsp;
    </div>
  );
  for (let i = 0; i < num; i++) {
    target.push(blankSpace);
  }
};

const match = (a, b) => a === b;

const getEventDisplay = (event, onClick, date) => {
  return (
    <a
      key={event._id}
      href="!#"
      className={
        "calendar-event text-white d-block p-1 mb-1 mx-auto bg-success"
      }
      onClick={onClick(event)}
    >
      {match(format(event.startDate), format(date)) ? event.name : "\u00A0"}
    </a>
  );
};

const MultiDayEvents = props => {
  if (isEmpty(props.events)) {
    return <span />;
  } else {
    const positions = [];
    const firstPosition = props.events[0].multiDayPosition;
    firstPosition > 0 && insertBlankSpaces(firstPosition, positions);
    //@TODO find more edge cases and insert/remove blank spaces accordingly

    props.events.forEach(event => {
      positions.push(getEventDisplay(event, props.onClick, props.date));
    });

    return positions.map(item => item);
  }
};

export default MultiDayEvents;
