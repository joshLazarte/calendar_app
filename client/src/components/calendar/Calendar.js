import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CalendarDayCell from "./CalendarDayCell";
import CalendarHeader from "./CalendarHeader";
import isEmpty from "../../validation/is-empty";
import moment from "moment";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: new Date(this.props.year, this.props.monthValue).getDay(),
      daysInMonth:
        32 - new Date(this.props.year, this.props.monthValue, 32).getDate()
    };
  }

  format = date => {
    return (
      moment(date)
        .utc()
        //this format with "/" is necessary
        .format("YYYY/MM/DD")
    );
  };

  match = (a, b) => a === b;

  getFirstDay = (year, monthValue) => {
    return new Date(year, monthValue).getDay();
  };

  getDaysInMonth = (year, monthValue) => {
    return 32 - new Date(year, monthValue, 32).getDate();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.monthValue !== this.props.monthValue ||
      prevProps.year !== this.props.year
    ) {
      this.setState({
        firstDay: this.getFirstDay(this.props.year, this.props.monthValue),
        daysInMonth: this.getDaysInMonth(this.props.year, this.props.monthValue)
      });
      this.handleMultiDayEvents(this.props.event.events);
    }
  }

  eventIsInThisMonth = (startDate, endDate) => {
    const { match, format } = this;
    const { monthValue, year } = this.props;
    const providedMonth = date => new Date(format(date)).getMonth();
    const providedYear = date => new Date(format(date)).getFullYear();

    return (
      (match(monthValue, providedMonth(startDate)) &&
        match(year, providedYear(startDate))) ||
      (match(monthValue, providedMonth(endDate)) &&
        match(year, providedYear(endDate)))
    );
  };

  matchMonth = events => {
    return events.filter(event =>
      this.eventIsInThisMonth(event.startDate, event.endDate)
    );
  };

  separateEvents = (oldArray, newArray) => {
    for (let i = oldArray.length - 1; i >= 0; i--) {
      if (oldArray[i].frequency === "multi-day") {
        newArray.push(oldArray[i]);
        oldArray.splice(i, 1);
      }
    }
  };

  sortEventsByDate = events => {
    events = events.sort((a, b) => {
      return (
        new Date(this.format(a.startDate)) - new Date(this.format(b.startDate))
      );
    });
    return events[0];
  };

  getEventDaysArray = event => {
    let startDateTimeValue = new Date(event.startDate).getTime();
    const eventDays = [startDateTimeValue];
    const msPerDay = 1000 * 60 * 60 * 24;
    const startDate = moment(event.startDate, "YYYYMMDD");
    const endDate = moment(event.endDate, "YYYYMMDD");
    const numberOfDays = endDate.diff(startDate, "days") + 1;

    for (let i = 1; i < numberOfDays; i++) {
      startDateTimeValue += msPerDay;
      eventDays[i] = startDateTimeValue;
    }
    return eventDays;
  };

  separateByOverlap = (events, separatedByOverlap) => {
    const eventToCompare = events.shift();
    const arrayOfDays = this.getEventDaysArray(eventToCompare);
    const childArray = [];
    for (let i = events.length - 1; i >= 0; i--) {
      let startDate = new Date(events[i].startDate).getTime();
      if (arrayOfDays.indexOf(startDate) !== -1) {
        childArray.unshift(events[i]);
        events.splice(i, 1);
      }
    }
    childArray.unshift(eventToCompare);
    separatedByOverlap.push(childArray);
  };

  getArrayOfOverlaps = events => {
    const separatedByOverlap = [];
    while (events.length > 0) {
      this.separateByOverlap(events, separatedByOverlap);
    }
    return separatedByOverlap;
  };

  addOverlapingIndices = arrOfArrs => {
    arrOfArrs.forEach(arr => {
      arr.forEach((event, index) => {
        event.multiDayPosition = index;
      });
    });
  };

  handleMultiDayEvents = events => {
    if (!isEmpty(events)) {
      let multiEvents = [];
      events = this.matchMonth(events);
      this.separateEvents(events, multiEvents);
      this.sortEventsByDate(multiEvents);
      multiEvents = this.getArrayOfOverlaps(multiEvents);
      this.addOverlapingIndices(multiEvents);
      multiEvents = multiEvents.flat();

      return [...events, ...multiEvents];
    }
  };

  componentDidMount() {
    this.handleMultiDayEvents(this.props.event.events);
  }

  getNumberOfLastMonthCells = () => {
    return this.state.firstDay;
  };

  getNumberOfNextMonthsCells = () => {
    const totalNumberOfCells = 42;
    return (
      totalNumberOfCells -
      (this.getNumberOfLastMonthCells() + this.state.daysInMonth)
    );
  };

  getLastMonthsValue = currentMonth => {
    if (currentMonth === 0) return 11;
    return currentMonth - 1;
  };

  getLastMonthsYear = (currentYear, currentMonth) => {
    if (currentMonth === 0) return currentYear - 1;
    return currentYear;
  };

  getNextMonthsValue = currentMonth => {
    if (currentMonth === 11) return 0;
    return currentMonth + 1;
  };

  getNextMonthsYear = (currentYear, currentMonth) => {
    if (currentMonth === 11) return currentYear + 1;
    return currentYear;
  };

  getLastMonthsCells = () => {
    const lastMonthsCells = [];
    const numberOfCells = this.getNumberOfLastMonthCells();
    if (numberOfCells === 0) return null;

    const lastMonth = this.getLastMonthsValue(this.props.monthValue);
    const lastMonthsYear = this.getLastMonthsYear(
      this.props.year,
      this.props.monthValue
    );
    let cellDate = this.getDaysInMonth(lastMonthsYear, lastMonth);

    for (let i = 0; i < numberOfCells; i++, cellDate--) {
      lastMonthsCells.unshift({
        date: cellDate,
        monthValue: lastMonth,
        year: lastMonthsYear
      });
    }

    return lastMonthsCells;
  };

  getNextMonthsCells = () => {
    const nextMonthsCells = [];
    const numberOfCells = this.getNumberOfNextMonthsCells();
    const nextMonth = this.getNextMonthsValue(this.props.monthValue);
    const nextMonthsYear = this.getNextMonthsYear(
      this.props.year,
      this.props.monthValue
    );
    let cellDate = 1;

    for (let i = 0; i < numberOfCells; i++, cellDate++) {
      nextMonthsCells.push({
        date: cellDate,
        monthValue: nextMonth,
        year: nextMonthsYear
      });
    }
    return nextMonthsCells;
  };

  getThisMonthsCells = () => {
    const { monthValue, year } = this.props;
    const { daysInMonth } = this.state;
    const cellsWithData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      cellsWithData.push({
        date: i,
        monthValue: monthValue,
        year: year
      });
    }
    return cellsWithData;
  };

  getCalendarData = () => {
    const rawCalendarData = [
      ...(this.getLastMonthsCells() || []),
      ...this.getThisMonthsCells(),
      ...this.getNextMonthsCells()
    ];
    return rawCalendarData;
  };

  getFilledOutCalendarRows = () => {
    const rawData = this.getCalendarData();
    const filledRows = [];
    const rowLength = 7;
    for (let i = 0; i < rawData.length; i += rowLength) {
      let rows = [];
      rows = rawData.slice(i, i + rowLength);
      filledRows.push(rows);
    }
    return filledRows;
  };

  render() {
    const calendarRows = this.getFilledOutCalendarRows();

    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <CalendarHeader />
        </thead>

        <tbody>
          {calendarRows.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((cell, index) => {
                  return (
                    <CalendarDayCell
                      events={this.handleMultiDayEvents(
                        this.props.event.events
                      )}
                      key={index}
                      date={cell.date}
                      month={cell.monthValue}
                      year={cell.year}
                      today={new Date()}
                      cellDate={new Date(cell.year, cell.monthValue, cell.date)}
                      day={new Date(
                        cell.year,
                        cell.monthValue,
                        cell.date
                      ).getDay()}
                      weekOrder={Math.ceil(cell.date / 7)}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Calendar.propTypes = {
  month: PropTypes.string.isRequired,
  monthValue: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  {}
)(Calendar);
