import React, { Component } from "react";
import autoLogOutIfNeeded from "../../validation/autoLogOut";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";
import moment from "moment";
import BackArrow from "./BackArrow";
import CalendarIcon from "./CalendarIcon";

class EventList extends Component {
  componentDidMount() {
    autoLogOutIfNeeded();
  }

  goBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const {
      multiDayEvents,
      notMultiDayEvents,
      date
    } = this.props.location.state;

    return (
      <div>
        <BackArrow goBack={this.goBack} />
        <h1 className="text-center">All Events</h1>
        <div className="text-center" style={{ fontSize: "1.2rem" }}>
          {moment(date).format("dddd, MMMM Do YYYY")}
        </div>
        <ul className="list-group mt-5">
          {!isEmpty(multiDayEvents) &&
            multiDayEvents.map(event => (
              <li
                key={event._id}
                className="list-group-item list-group-item-action"
              >
                <Link
                  className="text-dark"
                  to={{
                    pathname: `/event/${event._id}`,
                    state: {
                      disabled: true,
                      eventToDisplay: event,
                      hideModal: null,
                      formType: "READONLY"
                    }
                  }}
                >
                  <CalendarIcon />
                  <strong>{event.name}</strong>: &nbsp;
                  {moment(event.startDate).format("MM/DD")} -{" "}
                  {moment(event.endDate).format("MM/DD")}
                </Link>
              </li>
            ))}
          {!isEmpty(notMultiDayEvents) &&
            notMultiDayEvents.map(event => (
              <li
                key={event._id}
                className="list-group-item list-group-item-action"
              >
                <Link
                  className="text-dark"
                  to={{
                    pathname: `/event/${event._id}`,
                    state: {
                      disabled: true,
                      eventToDisplay: event,
                      hideModal: null,
                      formType: "READONLY"
                    }
                  }}
                >
                  <CalendarIcon />
                  <strong>{event.name}</strong>
                  {event.startTime && (
                    <span>
                      : {event.startTime}{" "}
                      {event.endTime && <span>- {event.endTime}</span>}
                    </span>
                  )}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default EventList;
