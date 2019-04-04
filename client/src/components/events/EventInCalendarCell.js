import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import isEmpty from "../../validation/is-empty";

class EventInCalendarCell extends Component {
  getCurrentEventsByDate = (date, events) => {
    const currentEvents = [];
    events.map(event => {
      if (
        moment(event.startDate)
          .utc()
          .format("YYYY-MM-DD") === date
      ) {
        currentEvents.push(event);
      }
    });
    return currentEvents;
  };

  onClick = e => {
    e.preventDefault();
  };

  render() {
    const { events, date } = this.props;
    const currentEvents = this.getCurrentEventsByDate(date, events);
    let eventContent;

    if (!isEmpty(currentEvents)) {
      eventContent = (
        <span>
          {currentEvents.map(event => {
            return (
              <a
                key={event._id}
                href="!#"
                className="calendar-event bg-primary text-white d-block p-1 mb-1"
                data-toggle="tooltip"
                data-placement="bottom"
                data-html="true"
                title="Don't have this working yet"
                onClick={this.onClick}
              >
                {event.startTime ? event.startTime : null} {event.name}
              </a>
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
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(mapStateToProps)(EventInCalendarCell);
