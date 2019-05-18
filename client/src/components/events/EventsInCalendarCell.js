import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import moment from "moment";
import FormModal from "../modal/FormModal";
import classNames from "classnames";
import Tooltip from "../modal/Tooltip";

class EventInCalendarCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showTooltip: false,
      renderedMultiDayEvents: [],
      renderedNotMultiDayEvents: [],
      showAllSingleEvents: true,
      eventInModal: {}
    };
  }

  componentDidMount() {
    const { multiDayEvents, notMultiDayEvents } = this.props;
    !isEmpty(multiDayEvents) &&
      this.setState({
        renderedMultiDayEvents: this.getRenderedEvents(multiDayEvents, true)
      });
    !isEmpty(notMultiDayEvents) &&
      this.setState({
        renderedNotMultiDayEvents: this.getRenderedEvents(
          notMultiDayEvents,
          false
        )
      });
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

  showTooltip = () => {
    this.setState({ showTooltip: true });
  };

  hideTooltip = () => {
    this.setState({ showTooltip: false });
  };

  match = (a, b) => a === b;

  getHideStart = (multi, single) => {
    let hideStart = false;

    if (!single) return hideStart;
    if (!multi && single.length > 3) return (hideStart = 3);
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
    const returnedEvents = events.map((event, index) => {
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
            onMouseEnter={this.showTooltip}
            onMouseLeave={this.hideTooltip}
          >
            {this.match(
              this.format(event.startDate),
              this.format(this.props.cellDate)
            )
              ? event.name
              : "\u00A0"}
          </a>
          {this.state.showModal && this.state.eventInModal._id === event._id ? (
            <FormModal
              key={event._id + index}
              disabled={true}
              eventToDisplay={this.state.eventInModal}
              hideModal={this.hideModal}
              formType={"READONLY"}
            />
          ) : null}
        </div>
      );
    });
    return returnedEvents;
  };

  render() {
    const { renderedMultiDayEvents, renderedNotMultiDayEvents } = this.state;

    let multiTest = new Array(1);
    let singleTest = new Array(3);
    console.log(this.getHideStart(multiTest, singleTest));

    // console.log(
    //   this.getHideStart(renderedMultiDayEvents, renderedNotMultiDayEvents)
    // );

    return (
      <div>
        {renderedMultiDayEvents.map((event, index) => (
          <span key={index}>{event}</span>
        ))}
        {renderedNotMultiDayEvents.map((event, index) => (
          <span key={index}>{event}</span>
        ))}

        {this.state.showTooltip && <Tooltip />}
      </div>
    );
  }
}

EventInCalendarCell.propTypes = {
  multiDayEvents: PropTypes.array.isRequired,
  notMultiDayEvents: PropTypes.array.isRequired
};

export default EventInCalendarCell;
