import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import EventInCalendarCell from "../events/EventInCalendarCell";
import classnames from "classnames";

class CalendarDayCell extends Component {
  constructor(props) {
    super(props);
    const { day, monthValue, year } = this.props;
    this.state = {
      events: [],
      today: moment(new Date()).format("YYYY-MM-DD"),
      cellDate: moment(new Date(year, monthValue, day)).format("YYYY-MM-DD")
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { day, monthValue, year } = nextProps;
    const newCellDate = moment(new Date(year, monthValue, day)).format(
      "YYYY-MM-DD"
    );
    if (newCellDate !== prevState.cellDate) {
      return {
        cellDate: newCellDate
      };
    }
    return null;
  }

  render() {
    const { emptyCell, day } = this.props;
    const { today, cellDate } = this.state;

    let cellData;

    if (emptyCell) {
      cellData = <small className="calendar-cell-number text-muted">X</small>;
    } else {
      cellData = (
        <small className="calendar-cell-number">
          {day}
          <EventInCalendarCell date={cellDate} />
        </small>
      );
    }

    return (
      <td className={classnames({ "today-cell": cellDate === today })}>
        {cellData}
      </td>
    );
  }
}

CalendarDayCell.propTypes = {
  emptyCell: PropTypes.bool.isRequired,
  day: PropTypes.number,
  monthValue: PropTypes.number,
  year: PropTypes.number
};

export default CalendarDayCell;
