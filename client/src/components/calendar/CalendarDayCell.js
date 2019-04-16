import React, { Component } from "react";
import PropTypes from "prop-types";
import EventInCalendarCell from "../events/EventInCalendarCell";
import classnames from "classnames";

class CalendarDayCell extends Component {
  constructor(props) {
    super(props);
    const { day, monthValue, year } = props;
    this.state = {
      today: new Date(),
      cellDate: new Date(year, monthValue, day)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { date, monthValue, year } = nextProps;
    const newCellDate = new Date(year, monthValue, date);
    if (newCellDate !== prevState.cellDate) {
      return {
        cellDate: newCellDate
      };
    }
    return null;
  }

  render() {
    const { date } = this.props;
    const { today, cellDate } = this.state;

    let cellData;

    cellData = (
      <small className="calendar-cell-number">
        {date}
        <EventInCalendarCell date={cellDate} />
      </small>
    );

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
  day: PropTypes.number,
  monthValue: PropTypes.number,
  year: PropTypes.number
};

export default CalendarDayCell;
