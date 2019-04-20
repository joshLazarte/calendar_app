import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class EventInCalendarCell extends Component {
  onClick = e => {
    e.preventDefault();
  };

  render() {
    const { multiDayEvents, notMultiDayEvents } = this.props;
    let eventContent;

    if (!isEmpty(notMultiDayEvents)) {
      eventContent = (
        <span>
          {notMultiDayEvents.map((event, index) => {
            return (
              <div key={index} className="calendar-event-container">
                <a
                  key={event._id}
                  href="!#"
                  className="calendar-event bg-primary text-white d-block p-1 mb-1 mx-auto"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  data-html="true"
                  title="Don't have this working yet"
                  onClick={this.onClick}
                >
                  {event.startTime ? event.startTime : null} {event.name}
                </a>
              </div>
            );
          })}
        </span>
      );
    } else {
      eventContent = null;
    }
    return <div>{eventContent}</div>;
  }
}

EventInCalendarCell.propTypes = {
  multiDayEvents: PropTypes.array.isRequired,
  notMultiDayEvents: PropTypes.array.isRequired
};

export default EventInCalendarCell;
