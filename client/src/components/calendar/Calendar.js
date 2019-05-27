import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CalendarDayCell from "./CalendarDayCell";
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
    return moment(date)
      .utc()
      .format("YYYY/MM/DD");
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

  eventIsInThisMonth = date => {
    return (
      this.match(
        this.props.monthValue,
        new Date(this.format(date)).getMonth()
      ) &&
      this.match(this.props.year, new Date(this.format(date)).getFullYear())
    );
  };

  matchMonth = events => {
    return events.filter(event => this.eventIsInThisMonth(event.startDate));
  };

  logAll = events => {
    events.forEach(event => console.log(event.name));
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

  separateByOverlap = (events, overlapingEvents) => {
    const eventToCompare = events.shift();
    const arrayOfDays = this.getEventDaysArray(eventToCompare);
    const childArray = [];
    for (let i = events.length - 1; i >= 0; i--) {
      let startDate = new Date(events[i].startDate).getTime();
      if (arrayOfDays.indexOf(startDate) !== -1) {
        childArray.push(events[i]);
        //@TODO: push any days after end date of eventToCompare
        // into the arrayOfDays
        //might need to move array of days out of this scope
        events.splice(i, 1);
      }
    }
    childArray.unshift(eventToCompare);
    overlapingEvents.push(childArray);
  };

  getArrayOfOverlaps = events => {
    const overlapingEvents = [];
    while (events.length > 0) {
      this.separateByOverlap(events, overlapingEvents);
    }
    return overlapingEvents;
  };

  handleMultiDayEvents = events => {
    if (!isEmpty(events)) {
      const multiEvents = [];
      events = this.matchMonth(events);
      this.separateEvents(events, multiEvents);
      this.sortEventsByDate(multiEvents);
      const overlapingEvents = this.getArrayOfOverlaps(multiEvents);
      console.log(overlapingEvents);

      //this.logAll(multiEvents);
    }
  };

  componentDidMount() {
    this.handleMultiDayEvents(this.props.event.events);
  }

  getNumberOfBeginningBlankCells = () => {
    return this.state.firstDay;
  };

  getNumberOfEndingBlankCells = () => {
    const totalNumberOfCells = 42;
    return (
      totalNumberOfCells -
      (this.getNumberOfBeginningBlankCells() + this.state.daysInMonth)
    );
  };

  getBeginningBlankCells = () => {
    const beginningBlankCells = [];
    const numberOfBlankCells = this.getNumberOfBeginningBlankCells();
    if (numberOfBlankCells === 0) {
      return null;
    } else {
      for (let i = 0; i < numberOfBlankCells; i++) {
        beginningBlankCells.push({
          emptyCell: true
        });
      }
    }
    return beginningBlankCells;
  };

  getEndingBlankCells = () => {
    const endingBlankCells = [];
    const numberOfBlankCells = this.getNumberOfEndingBlankCells();
    for (let i = 0; i < numberOfBlankCells; i++) {
      endingBlankCells.push({
        emptyCell: true
      });
    }
    return endingBlankCells;
  };

  getCellsWithData = () => {
    const { monthValue, year } = this.props;
    const { daysInMonth } = this.state;
    const cellsWithData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      cellsWithData.push({
        emptyCell: false,
        date: i,
        monthValue: monthValue,
        year: year
      });
    }
    return cellsWithData;
  };

  getCalendarData = () => {
    const rawCalendarData = [
      ...(this.getBeginningBlankCells() || []),
      ...this.getCellsWithData(),
      ...this.getEndingBlankCells()
    ];
    return rawCalendarData;
  };

  getFilledOutCalendarRows = () => {
    const rawData = this.getCalendarData();
    const filledRows = [];
    const rowLength = 7;
    for (let i = 0; i < rawData.length; i += rowLength) {
      let temparray = [];
      temparray = rawData.slice(i, i + rowLength);
      filledRows.push(temparray);
    }
    return filledRows;
  };

  render() {
    const calendarRows = this.getFilledOutCalendarRows();

    return (
      <div>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr className="text-center">
              <th scope="col">Sun</th>
              <th scope="col">Mon</th>
              <th scope="col">Tue</th>
              <th scope="col">Wed</th>
              <th scope="col">Thu</th>
              <th scope="col">Fri</th>
              <th scope="col">Sat</th>
            </tr>
          </thead>
          <tbody>
            {calendarRows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((cell, index) => {
                    return cell.emptyCell ? (
                      <td key={index}>
                        <small className="calendar-cell-number text-muted">
                          X
                        </small>
                      </td>
                    ) : (
                      <CalendarDayCell
                        key={index}
                        date={cell.date}
                        month={cell.monthValue}
                        year={cell.year}
                        today={new Date()}
                        cellDate={
                          new Date(cell.year, cell.monthValue, cell.date)
                        }
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
      </div>
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
