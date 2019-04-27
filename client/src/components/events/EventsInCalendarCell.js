import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import moment from "moment";
import Modal from "../modal/Modal";

class EventInCalendarCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      eventInModal: {}
    };
  }

  showModal = eventInModal => e => {
    e.preventDefault();
    this.setState({ showModal: true, eventInModal });
  };

  hideModal = () => {
    this.setState({ showModal: false, eventInModal: {} });
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
              <div key={index}>
                <a
                  key={event._id}
                  href="!#"
                  className="calendar-event bg-success text-white d-block p-1 mb-1 mx-auto"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  data-html="true"
                  title="Don't have this working yet"
                  onClick={this.showModal(event)}
                >
                  {this.match(
                    this.format(event.startDate),
                    this.format(this.props.cellDate)
                  )
                    ? event.name
                    : "\u00A0"}
                </a>
                {this.state.showModal ? (
                  <Modal
                    key={event._id + index}
                    event={this.state.eventInModal}
                    hideModal={this.hideModal}
                  />
                ) : null}
              </div>
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
                  onClick={this.showModal(event)}
                >
                  {event.startTime ? event.startTime : null} {event.name}
                </a>
                {this.state.showModal ? (
                  <Modal
                    key={event._id + index}
                    event={this.state.eventInModal}
                    hideModal={this.hideModal}
                  />
                ) : null}
              </div>
            );
          })}
        </span>
      );
    } else {
      renderedNotMultiDayEvents = null;
    }

    return (
      <div>
        {renderedMultiDayEvents}
        {renderedNotMultiDayEvents}
      </div>
    );
  }
}

EventInCalendarCell.propTypes = {
  multiDayEvents: PropTypes.array.isRequired,
  notMultiDayEvents: PropTypes.array.isRequired
};

export default EventInCalendarCell;
