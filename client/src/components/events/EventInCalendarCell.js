import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import isEmpty from "../../validation/is-empty";

class EventInCalendarCell extends Component {
  constructor(props) {
    super(props);
    const { date } = props;
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      weekOrder: Math.ceil(date.getDate() / 7),
      day: date.getDay(),
      singleEvents: [],
      multiDayEvents: []
    };
  }

  onClick = e => {
    e.preventDefault();
  };

  format = date => {
    return moment(date)
      .utc()
      .format("YYYY-MM-DD");
  };

  match = (a, b) => a === b;

  getWeekday = day => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[day];
  };

  singleEventHandler = event => {
    const { year, month, date, singleEvents } = this.state;
    const { match, format } = this;
    if (match(format(event.startDate), format(new Date(year, month, date)))) {
      this.setState({ singleEvents: [...singleEvents, event] });
    }
  };

  weeklyEventHandler = event => {
    const { singleEvents, day } = this.state;
    const { match, getWeekday } = this;
    if (match(event.weeklyDay, getWeekday(day))) {
      this.setState({ singleEvents: [...singleEvents, event] });
    }
  };

  sortEventsIntoCells = events => {
    events.map(event => {
      switch (event.frequency) {
        case "single":
          this.singleEventHandler(event);
          break;
        case "weekly":
          this.weeklyEventHandler(event);
          break;
        default:
          return [];
      }
    });
  };

  //maybe don't do this here? will lead to duplicate events
  componentDidMount() {
    const { events } = this.props;
    this.sortEventsIntoCells(events);
  }

  //This is throwing an error. set state is running after
  //component is unmounting due to async/await
  //without async, weekly events are on wrong day
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.date !== this.props.date) {
      await this.setState({
        year: this.props.date.getFullYear(),
        month: this.props.date.getMonth(),
        date: this.props.date.getDate(),
        weekOrder: Math.ceil(this.props.date.getDate() / 7),
        day: this.props.date.getDay(),
        singleEvents: [],
        multiDayEvents: []
      });
      this.sortEventsIntoCells(this.props.events);
    }
  }

  render() {
    const { singleEvents } = this.state;

    let eventContent;

    if (!isEmpty(singleEvents)) {
      eventContent = (
        <span>
          {singleEvents.map((event, index) => {
            return (
              <a
                key={event._id + index}
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
