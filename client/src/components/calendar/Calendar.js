import React, { Component } from "react";
import PropTypes from "prop-types";

class Calendar extends Component {
  render() {
    return (
      <div>
        <h1>Calendar</h1>
      </div>
    );
  }
}

Calendar.propTypes = {
  month: PropTypes.string.isRequired,
  monthValue: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default Calendar;
