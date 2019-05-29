import React from "react";
import moment from "moment";
import isEmpty from "../../validation/is-empty";
import shortid from "shortid";

const format = date => {
  return moment(date)
    .utc()
    .format("YYYY-MM-DD");
};

const insertBlankSpaces = (num, target) => {
  for (let i = 0; i < num; i++) {
    const blankSpace = (
      <div key={shortid.generate()} className="mb-1">
        &nbsp;
      </div>
    );
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

const getDuplicates = arr => {
  const object = {};
  const result = [];

  arr.forEach(item => {
    if (!object[item]) object[item] = 0;
    object[item] += 1;
  });

  for (const prop in object) {
    if (object[prop] >= 2) {
      result.push(prop);
    }
  }

  return result;
};

const MultiDayEvents = props => {
  if (isEmpty(props.events)) {
    return <span />;
  } else {
    const { events } = props;
    const displayed = [];
    const positions = events.map(event => event.multiDayPosition);
    const firstPosition = events[0].multiDayPosition;
    firstPosition > 0 && insertBlankSpaces(firstPosition, displayed);
    props.events.forEach(event => {
      displayed.push(getEventDisplay(event, props.onClick, props.date));
    });
    //@TODO find more edge cases and insert/remove blank spaces accordingly
    //const duplicatePositions = getDuplicates(positions);

    return displayed.map(item => item);
  }
};

export default MultiDayEvents;
