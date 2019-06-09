import React, { Component } from "react";
import autoLogOutIfNeeded from "../../validation/autoLogOut";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";
import moment from "moment";
import CalendarIcon from "./CalendarIcon";

class EventList extends Component {
  componentDidMount() {
    autoLogOutIfNeeded(this.props.history);
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
        <h2 className="mb-5 date-header-content">
          <a
            href="!#"
            className="nav-link d-inline date-header-content"
            onClick={this.goBack}
          >
            <i className="fas fa-chevron-left" />
          </a>
          {moment(date).format("dddd, MMMM Do YYYY")}
        </h2>

        <ul className="list-group">
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
                      : {event.startTime} - {event.endTime}
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
