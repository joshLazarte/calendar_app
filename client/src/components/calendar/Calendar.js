import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CalendarDayCell from "./CalendarDayCell";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: new Date(this.props.year, this.props.monthValue).getDay(),
      daysInMonth:
        32 - new Date(this.props.year, this.props.monthValue, 32).getDate()
    };
  }

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

  handleMultiDayEvents = events => {
    console.log(events);
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
