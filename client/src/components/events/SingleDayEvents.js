import React from "react";
import isEmpty from "../../validation/is-empty";

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
        <div key={index} className="calendar-event-container">
          <a
            key={event._id}
            href="!#"
            className={
              "calendar-event text-white d-block p-1 mb-1 mx-auto bg-primary"
            }
            onClick={props.onClick(event)}
          >
            {event.name}
          </a>
        </div>
      );
    });
  }
};

export default SingleDayEvents;
