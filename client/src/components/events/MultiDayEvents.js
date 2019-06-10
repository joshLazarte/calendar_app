import React from "react";
import moment from "moment";
import isEmpty from "../../validation/is-empty";
import shortid from "shortid";
import classnames from "classnames";
import StartBlock from "./StartBlock";

const format = date => {
  return moment(date)
    .utc()
    .format("YYYY/MM/DD");
};

const isFirstDay = (eventDate, cellDate) => {
  return match(format(eventDate), format(cellDate));
};

const match = (a, b) => a === b;

const getEventDisplay = (event, onClick, date, isSunday) => {
  return (
    <a
      key={event._id}
      href="!#"
      className={classnames(
        "calendar-event text-white d-block mb-1 bg-success",
        {
          "p-1": !isSunday && !isFirstDay(event.startDate, date)
        }
      )}
      onClick={onClick(event)}
    >
      {isFirstDay(event.startDate, date) || isSunday ? (
        <span>
          <StartBlock />
          {event.name}
        </span>
      ) : (
        "\u00A0"
      )}
    </a>
  );
};

const sortByPosition = events => {
  events.sort((a, b) => a.multiDayPosition - b.multiDayPosition);
};

const blankSpace = key => {
  return (
    // 24.8px lineHeight is for weird display in firefox
    <div key={key} className="mb-1 d-block" style={{ lineHeight: "24.8px" }}>
      &nbsp;
    </div>
  );
};

const insertBlank = (diff, target, i) => {
  for (let j = 0; j < diff; j++) {
    target.splice(i, 0, blankSpace(shortid.generate()));
  }
};

const insertBlankSpaces = (positions, target) => {
  let i = 0;
  positions.forEach(position => {
    if (position !== i) {
      const diff = position - i;
      insertBlank(diff, target, i);
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

const handleDuplicates = (duplicates, events) => {
  let last = events[events.length - 1].multiDayPosition;
  duplicates.forEach(dup => {
    const dupEvents = events
      .filter(event => event.multiDayPosition === Number(dup))
      .sort((a, b) => {
        return new Date(format(a.startDate)) - new Date(format(b.startDate));
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
};

const getPositions = events => {
  sortByPosition(events);
  return events.map(event => event.multiDayPosition);
};

const getDisplayed = (events, onClick, date, isSunday) => {
  return events.map(event => getEventDisplay(event, onClick, date, isSunday));
};

const canBeMoved = (event, date, isSunday) => {
  return (
    (isFirstDay(event.startDate, date) || isSunday) &&
    event.multiDayPosition !== 0
  );
};

const fillBlankSpaceIfPossible = (events, positions, date, isSunday) => {
  const blanks = [];
  for (let i = 0; i < positions.length; i++) {
    if (positions[i] !== i) {
      blanks.push(i);
    }
  }

  !isEmpty(blanks) &&
    events.forEach(event => {
      if (canBeMoved(event, date, isSunday))
        event.multiDayPosition = blanks.shift();
    });
};

const MultiDayEvents = props => {
  if (isEmpty(props.events)) {
    return <span />;
  } else {
    const { events, onClick, date, isSunday } = props;
    let positions = getPositions(events);
    const duplicates = getDuplicates(positions);

    if (!isEmpty(duplicates)) {
      handleDuplicates(duplicates, events);
      positions = getPositions(events);
    }

    fillBlankSpaceIfPossible(events, positions, date, isSunday);

    positions = getPositions(events);

    const displayed = getDisplayed(events, onClick, date, isSunday);

    insertBlankSpaces(positions, displayed);

    return displayed.map(item => item);
  }
};

export default MultiDayEvents;
