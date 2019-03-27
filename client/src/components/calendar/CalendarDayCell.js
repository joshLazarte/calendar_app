import React, { Component } from "react";
import PropTypes from "prop-types";

class CalendarDayCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      today: new Date().toDateString()
    };
  }

  render() {
    const { emptyCell, day, monthValue, year } = this.props;
    const { today } = this.state;

    let cellData;

    if (emptyCell) {
      cellData = <span>X</span>;
    } else if (new Date(year, monthValue, day).toDateString() === today) {
      cellData = (
        <span
          style={{
            border: "1px solid black",
            borderRadius: "50%",
            padding: "5px 7px 5px 5px"
          }}
        >
          {day}
        </span>
      );
    } else {
      cellData = day;
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
