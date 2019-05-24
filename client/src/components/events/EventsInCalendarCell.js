import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import moment from "moment";
import FormModal from "../modal/FormModal";
import classNames from "classnames";

class EventsInCalendarCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showAllEvents: false,
      eventInModal: {}
    };
  }

  showModal = eventInModal => e => {
    e.preventDefault();
    this.setState({ showModal: true, eventInModal });
  };

  hideModal = e => {
    if (e) e.preventDefault();
    this.setState({ showModal: false, eventInModal: {} });
  };

  format = date => {
    return moment(date)
      .utc()
      .format("YYYY-MM-DD");
  };

  match = (a, b) => a === b;

  toggleShowAll = () => {
    this.setState({ showAllEvents: !this.state.showAllEvents });
  };

  getHideStart = (multi, single) => {
    let hideStart = false;

    if (isEmpty(single)) return hideStart;
    if (isEmpty(multi) && single.length > 3) return (hideStart = 3);
    if (multi.length > 3) return (hideStart = 0);

    let j = 0;
    for (let i = 3; i > 0; i--) {
      if (multi.length === i && single.length > j) {
        hideStart = j;
        break;
      }
      j++;
    }
    return hideStart;
  };

  getRenderedEvents = (events, isMulti) => {
    return events.map((event, index) => {
      return (
        <div
          key={index}
          className={classNames({ "calendar-event-container": !isMulti })}
        >
          <a
            key={event._id}
            href="!#"
            className={classNames(
              "calendar-event text-white d-block p-1 mb-1 mx-auto",
              { "bg-primary": !isMulti },
              { "bg-success": isMulti }
            )}
            onClick={this.showModal(event)}
          >
            {this.match(
              this.format(event.startDate),
              this.format(this.props.cellDate)
            )
              ? event.name
              : "\u00A0"}
          </a>
        </div>
      );
    });
  };

  render() {
    const { multiDayEvents, notMultiDayEvents } = this.props;

    const hideStart = this.getHideStart(multiDayEvents, notMultiDayEvents);
    let renderedNotMultiDayEvents;

    if (!isEmpty(notMultiDayEvents))
      renderedNotMultiDayEvents = this.getRenderedEvents(
        notMultiDayEvents,
        false
      );

    let singleEventsToDisplay, arrow;

    if (!this.state.showAllEvents && hideStart) {
      singleEventsToDisplay = renderedNotMultiDayEvents.filter(
        (event, index) => index < hideStart
      );
    } else {
      singleEventsToDisplay = renderedNotMultiDayEvents;
    }

    if (!this.state.showAllEvents && hideStart) {
      arrow = (
        <span className="float-right" onClick={this.toggleShowAll}>
          &#9660;
        </span>
      );
    } else if (this.state.showAllEvents && hideStart) {
      arrow = (
        <span className="float-right" onClick={this.toggleShowAll}>
          &#9650;
        </span>
      );
    } else {
      arrow = null;
    }

    return (
      <div>
        {!isEmpty(multiDayEvents) &&
          this.getRenderedEvents(multiDayEvents, true)}

        {singleEventsToDisplay}

        {arrow}
        {this.state.showModal ? (
          <FormModal
            disabled={true}
            eventToDisplay={this.state.eventInModal}
            hideModal={this.hideModal}
            formType={"READONLY"}
          />
        ) : null}
      </div>
    );
  }
}

EventsInCalendarCell.propTypes = {
  multiDayEvents: PropTypes.array.isRequired,
  notMultiDayEvents: PropTypes.array.isRequired
};

export default EventsInCalendarCell;
