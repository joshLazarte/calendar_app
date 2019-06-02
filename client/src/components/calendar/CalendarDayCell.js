import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import EventsInCalendarCell from "../events/EventsInCalendarCell";
import classnames from "classnames";
import Breakpoint from "react-socks";
import moment from "moment";
import FormModal from "../modal/FormModal";

class CalendarDayCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  hideModal = e => {
    if (e) e.preventDefault();
    this.setState({ showModal: false });
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

  handleMultiDayEvent = event => {
    let startDateTimeValue = new Date(event.startDate).getTime();
    const cellDate = this.format(this.props.cellDate);
    const eventDays = [startDateTimeValue];
    const msPerDay = 1000 * 60 * 60 * 24;
    const startDate = moment(event.startDate, "YYYYMMDD");
    const endDate = moment(event.endDate, "YYYYMMDD");
    const numberOfDays = endDate.diff(startDate, "days") + 1;

    for (let i = 1; i < numberOfDays; i++) {
      startDateTimeValue += msPerDay;
      eventDays[i] = startDateTimeValue;
    }

    eventDays.forEach((day, index) => {
      eventDays[index] = this.format(new Date(day));
    });

    return eventDays.indexOf(cellDate) !== -1;
  };

  sortEventsIntoCells = events => {
    const multiDayEvents = [];
    const notMultiDayEvents = [];
    if (!isEmpty(events)) {
      events.forEach(event => {
        if (event.frequency === "multi-day") {
          this.handleMultiDayEvent(event) && multiDayEvents.push(event);
        } else {
          this.handleEventFrequency(event) && notMultiDayEvents.push(event);
        }
      });
    }

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
        <span>
          <small className="calendar-cell-number">{date} </small>
          <Breakpoint medium up>
            <EventsInCalendarCell
              multiDayEvents={multiDayEvents}
              notMultiDayEvents={notMultiDayEvents}
              cellDate={this.props.cellDate}
              isSunday={this.props.day === 0}
            />
          </Breakpoint>
        </span>
      );
    } else {
      cellData = <small className="calendar-cell-number">{date}</small>;
    }

    return (
      <td
        // @TODO: NOT WORKING!!! deal with propogation onClick={this.showModal}
        className={classnames({
          "today-cell": cellDate.toDateString() === today.toDateString()
        })}
      >
        {cellData}
        {this.state.showModal ? (
          <FormModal
            disabled={false}
            hideModal={this.hideModal}
            eventToDisplay={{}}
            formType={"ADD"}
          />
        ) : null}
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
  events: PropTypes.array
};

export default CalendarDayCell;
