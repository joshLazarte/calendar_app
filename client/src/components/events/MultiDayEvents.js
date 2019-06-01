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

const isFirstOfMonth = date => {
  return (
    moment(date)
      .utc()
      .date() === 1
  );
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
          "p-1":
            !isSunday &&
            !isFirstDay(event.startDate, date) &&
            !isFirstOfMonth(date)
        }
      )}
      onClick={onClick(event)}
    >
      {isFirstDay(event.startDate, date) || isSunday || isFirstOfMonth(date) ? (
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
    <div key={key} className="mb-1">
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

const handleDuplicates = (duplicates, events, positions) => {
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
  positions = getPositions(events);
};

const getPositions = events => {
  sortByPosition(events);
  return events.map(event => event.multiDayPosition);
};

const getDisplayed = (events, onClick, date, isSunday) => {
  return events.map(event => getEventDisplay(event, onClick, date, isSunday));
};

const MultiDayEvents = props => {
  if (isEmpty(props.events)) {
    return <span />;
  } else {
    const { events, onClick, date, isSunday } = props;
    let positions = getPositions(events);
    const duplicates = getDuplicates(positions);

    !isEmpty(duplicates) && handleDuplicates(duplicates, events, positions);

    //@TODO finish this function
    // const fillBlankSpaceIfPossible = (events, positions) => {
    //   const canBeMoved = event => {
    //     return (
    //       isFirstDay(event.startDate, date) || isFirstOfMonth(date) || isSunday
    //     );
    //   };

    //   const blanks = [];

    //   let i = 0;
    //   positions.forEach(position => {
    //     if (position !== i) {
    //       const diff = position - i;
    //       for (let j = 0; j < diff; j++) {
    //         target.splice(i, 0, blankSpace(shortid.generate()));
    //       }
    //       i += diff;
    //     }
    //     i++;
    //   });

    //   console.log(blanks);
    // };

    // fillBlankSpaceIfPossible(events, positions);

    const displayed = getDisplayed(events, onClick, date, isSunday);

    insertBlankSpaces(positions, displayed);

    return displayed.map(item => item);
  }
};

export default MultiDayEvents;
