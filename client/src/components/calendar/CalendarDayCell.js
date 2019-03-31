import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import EventInCalendarCell from "../events/EventInCalendarCell";

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
      cellData = <span>X</span>;
    } else if (cellDate === today) {
      cellData = (
        <span>
          <span
            style={{
              border: "1px solid black",
              borderRadius: "50%",
              padding: "5px 7px 5px 5px"
            }}
          >
            {day}
          </span>
          <EventInCalendarCell date={cellDate} />
        </span>
      );
    } else {
      cellData = (
        <span>
          {day}
          <EventInCalendarCell date={cellDate} />
        </span>
      );
    }

    return <td>{cellData}</td>;
  }
}

CalendarDayCell.propTypes = {
  emptyCell: PropTypes.bool.isRequired,
  day: PropTypes.number,
  monthValue: PropTypes.number,
  year: PropTypes.number
};

export default CalendarDayCell;
