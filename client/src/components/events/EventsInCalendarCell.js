import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import moment from "moment";

class EventInCalendarCell extends Component {
  onClick = e => {
    e.preventDefault();
  };

  format = date => {
    return moment(date)
      .utc()
      .format("YYYY-MM-DD");
  };

  match = (a, b) => a === b;

  render() {
    const { multiDayEvents, notMultiDayEvents } = this.props;

    let renderedMultiDayEvents;
    let renderedNotMultiDayEvents;

    if (!isEmpty(multiDayEvents)) {
      renderedMultiDayEvents = (
        <span>
          {multiDayEvents.map((event, index) => {
            return (
              <a
                key={event._id}
                href="!#"
                className="calendar-event bg-success text-white d-block p-1 mb-1 mx-auto"
                data-toggle="tooltip"
                data-placement="bottom"
                data-html="true"
                title="Don't have this working yet"
                onClick={this.onClick}
              >
                {this.match(
                  this.format(event.startDate),
                  this.format(this.props.cellDate)
                )
                  ? event.name
                  : "\u00A0"}
              </a>
            );
          })}
        </span>
      );
    } else {
      renderedMultiDayEvents = null;
    }

    if (!isEmpty(notMultiDayEvents)) {
      renderedNotMultiDayEvents = (
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
      renderedNotMultiDayEvents = null;
    }

    const eventContent = (
      <span>
        {renderedMultiDayEvents}
        {renderedNotMultiDayEvents}
      </span>
    );
    return <div>{eventContent}</div>;
  }
}

EventInCalendarCell.propTypes = {
  multiDayEvents: PropTypes.array.isRequired,
  notMultiDayEvents: PropTypes.array.isRequired
};

export default EventInCalendarCell;
