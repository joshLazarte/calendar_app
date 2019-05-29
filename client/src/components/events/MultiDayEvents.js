import React from "react";
import moment from "moment";
import isEmpty from "../../validation/is-empty";
import shortid from "shortid";

const format = date => {
  return moment(date)
    .utc()
    .format("YYYY-MM-DD");
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

const sortByPosition = events => {
  events.sort((a, b) => a.multiDayPosition - b.multiDayPosition);
};

const insertBlankSpaces = (positions, target) => {
  let i = 0;
  positions.forEach(position => {
    if (position !== i) {
      const diff = position - i;
      const insertBlank = num => {
        for (let j = 0; j < num; j++) {
          const blankSpace = (
            <div key={shortid.generate()} className="mb-1">
              &nbsp;
            </div>
          );
          target.splice(i, 0, blankSpace);
        }
      };
      insertBlank(diff);
      i += diff;
    }
    i++;
  });
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

const handleDuplicates = () => {};

const MultiDayEvents = props => {
  if (isEmpty(props.events)) {
    return <span />;
  } else {
    const events = props.events;
    const displayed = [];
    sortByPosition(events);
    let positions = events.map(event => event.multiDayPosition);

    let last = events[events.length - 1].multiDayPosition;

    const duplicates = getDuplicates(positions);

    if (!isEmpty(duplicates)) {
      duplicates.forEach(dup => {
        const dupEvents = events
          .filter(event => event.multiDayPosition === Number(dup))
          .sort((a, b) => {
            return (
              new Date(format(a.startDate)) - new Date(format(b.startDate))
            );
          });

        dupEvents.forEach((dupEvent, index) => {
          if (index > 0) {
            events.forEach(Event => {
              if (Event._id === dupEvent._id) {
                last++;
                Event.multiDayPosition = last;
              }
            });
          }
        });
      });
    }

    sortByPosition(events);
    positions = events.map(event => event.multiDayPosition);

    props.events.forEach(event => {
      displayed.push(getEventDisplay(event, props.onClick, props.date));
    });

    insertBlankSpaces(positions, displayed);

    return displayed.map(item => item);
  }
};

export default MultiDayEvents;
