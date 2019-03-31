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
  render() {
    const { events, date } = this.props;
    const currentEvents = this.getCurrentEventsByDate(date, events);
    let eventContent;

    if (!isEmpty(currentEvents)) {
      eventContent = (
        <ul>
          {currentEvents.map(event => {
            return <li key={event._id}>{event.name}</li>;
          })}
        </ul>
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
