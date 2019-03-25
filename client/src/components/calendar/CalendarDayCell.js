import React, { Component } from "react";
import PropTypes from "prop-types";

class CalendarDayCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  render() {
    const { emptyCell, day } = this.props;
    return <td>{emptyCell ? <span>X</span> : <span>{day}</span>}</td>;
  }
}

CalendarDayCell.propTypes = {
  emptyCell: PropTypes.bool.isRequired,
  day: PropTypes.number,
  monthValue: PropTypes.number,
  year: PropTypes.number
};

export default CalendarDayCell;
