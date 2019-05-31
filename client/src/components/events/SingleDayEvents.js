import React from "react";
import isEmpty from "../../validation/is-empty";
import StartBlock from "./StartBlock";

const getEvents = (events, showAll, hideStart) => {
  let returnedEvents;
  if ((!showAll && hideStart) || (!showAll && hideStart === 0)) {
    returnedEvents = events.filter((event, index) => index < hideStart);
  } else {
    returnedEvents = events;
  }

  return returnedEvents;
};

const SingleDayEvents = props => {
  if (isEmpty(props.events)) {
    return <span />;
  } else {
    const eventsToDisplay = getEvents(
      props.events,
      props.showAll,
      props.hideStart
    );
    return eventsToDisplay.map((event, index) => {
      return (
        <div key={index}>
          <a
            key={event._id}
            href="!#"
            className={
              "calendar-event text-white d-block mb-1 mx-auto bg-primary"
            }
            onClick={props.onClick(event)}
          >
            <span>
              <StartBlock />
              {event.name}
            </span>
          </a>
        </div>
      );
    });
  }
};

export default SingleDayEvents;
