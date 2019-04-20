import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import EventsInCalendarCell from "../events/EventsInCalendarCell";
import classnames from "classnames";
import moment from "moment";

class CalendarDayCell extends Component {
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

  compareScheduleAndWeekOrder = (schedule, weekOrder) => {
    switch (schedule) {
      case "1st and 3rd":
        return weekOrder === 1 || weekOrder === 3;
      case "2nd and 4th":
        return weekOrder === 2 || weekOrder === 4;
      case "1st":
        return weekOrder === 1;
      case "2nd":
        return weekOrder === 2;
      case "3rd":
        return weekOrder === 3;
      case "4th":
        return weekOrder === 4;
      default:
        return null;
    }
  };

  singleEventHandler = event => {
    const { cellDate } = this.props;
    const { match, format } = this;
    return match(format(event.startDate), format(cellDate));
  };

  weeklyEventHandler = event => {
    const { day } = this.props;
    const { match, getWeekday } = this;
    return match(event.weeklyDay, getWeekday(day));
  };

  biWeeklyEventHandler = event => {
    const { day, weekOrder } = this.props;
    const { match, getWeekday } = this;
    const weekOrderMatches = this.compareScheduleAndWeekOrder(
      event.biWeeklySchedule,
      weekOrder
    );
    return match(event.biWeeklyDay, getWeekday(day)) && weekOrderMatches;
  };

  monthlyEventHandler = event => {
    const { day, weekOrder, date } = this.props;
    const { match, getWeekday } = this;

    if (event.monthlyType === "by date") {
      return match(Number(event.monthlyDate.replace(/st|nd|rd|th/, "")), date);
    } else {
      const weekOrderMatches = this.compareScheduleAndWeekOrder(
        event.monthlySchedule,
        weekOrder
      );
      return match(event.monthlyDay, getWeekday(day)) && weekOrderMatches;
    }
  };

  handleEventFrequency = event => {
    switch (event.frequency) {
      case "single":
        return this.singleEventHandler(event);
      case "weekly":
        return this.weeklyEventHandler(event);
      case "bi-weekly":
        return this.biWeeklyEventHandler(event);
      case "monthly":
        return this.monthlyEventHandler(event);
      default:
        return null;
    }
  };

  sortEventsIntoCells = events => {
    const multiDayEvents = [];
    const notMultiDayEvents = [];

    events.forEach(event => {
      if (event.frequency === "multi-day") {
        //TODO handleMultiDay(event)
      } else {
        this.handleEventFrequency(event) && notMultiDayEvents.push(event);
      }
    });

    return {
      multiDayEvents,
      notMultiDayEvents
    };
  };

  render() {
    const { date, events, today, cellDate } = this.props;

    let cellData;

    const eventsInCell = this.sortEventsIntoCells(events);

    const { multiDayEvents, notMultiDayEvents } = eventsInCell;

    if (!isEmpty(multiDayEvents) || !isEmpty(notMultiDayEvents)) {
      cellData = (
        <small className="calendar-cell-number">
          {date}{" "}
          <EventsInCalendarCell
            multiDayEvents={multiDayEvents}
            notMultiDayEvents={notMultiDayEvents}
          />
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
  day: PropTypes.number,
  weekOrder: PropTypes.number,
  today: PropTypes.instanceOf(Date),
  cellDate: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(mapStateToProps)(CalendarDayCell);
