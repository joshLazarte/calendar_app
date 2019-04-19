import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import EventInCalendarCell from "../events/EventInCalendarCell";
import classnames from "classnames";
import moment from "moment";

class CalendarDayCell extends Component {
  constructor(props) {
    super(props);
    const { date, month, year } = props;
    this.state = {
      today: new Date(),
      cellDate: new Date(year, month, date),
      year,
      month,
      date,
      day: new Date(year, month, date).getDay(),
      weekOrder: Math.ceil(new Date(year, month, date).getDate() / 7),
      singleEvents: [],
      multiDayEvents: []
    };
  }

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
    const { cellDate, singleEvents } = this.state;
    const { match, format } = this;
    if (match(format(event.startDate), format(cellDate))) {
      this.setState({ singleEvents: [...singleEvents, event] });
    }
  };

  // weeklyEventHandler = event => {
  //   const { singleEvents, day } = this.state;
  //   const { match, getWeekday } = this;
  //   if (match(event.weeklyDay, getWeekday(day))) {
  //     this.setState({ singleEvents: [...singleEvents, event] });
  //   }
  // };

  sortEventsIntoCells = events => {
    events.map(event => {
      switch (event.frequency) {
        case "single":
          this.singleEventHandler(event);
          break;
        // case "weekly":
        //   this.weeklyEventHandler(event);
        //   break;
        default:
          return [];
      }
    });
  };

  componentDidMount() {
    const { events } = this.props;
    this.sortEventsIntoCells(events);
  }

  componentDidUpdate(prevProps, prevState) {
    const { month, events } = this.props;
    if (prevProps.month !== month) {
      this.setState((prevState, props) => ({
        cellDate: new Date(props.year, props.month, props.date),
        year: props.year,
        month: props.month,
        date: props.date,
        day: new Date(props.year, props.month, props.date).getDay(),
        weekOrder: Math.ceil(
          new Date(props.year, props.month, props.date).getDate() / 7
        ),
        singleEvents: [],
        multiDayEvents: []
      }));
      this.sortEventsIntoCells(events);
    }
  }

  render() {
    const { date } = this.props;
    const { today, cellDate, singleEvents } = this.state;

    let cellData;

    if (!isEmpty(singleEvents)) {
      cellData = (
        <small className="calendar-cell-number">
          {date} <p>Event</p>
        </small>
      );
    } else {
      cellData = <small className="calendar-cell-number">{date}</small>;
    }

    return (
      <td
        className={classnames({
          "today-cell": cellDate.toDateString() === today.toDateString()
        })}
      >
        {cellData}
      </td>
    );
  }
}

CalendarDayCell.propTypes = {
  date: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(mapStateToProps)(CalendarDayCell);
