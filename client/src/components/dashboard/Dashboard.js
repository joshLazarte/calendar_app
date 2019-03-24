import React, { Component } from "react";
import Calendar from "../calendar/Calendar";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      monthValue: new Date().getMonth(),
      month: this.getMonthNameFromMonthValue(new Date().getMonth()),
      year: new Date().getFullYear()
    };
  }

  getMonthNameFromMonthValue = monthValue => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[monthValue];
  };

  setMonthToPreviousMonth = () => {
    const { monthValue, year } = this.state;
    if (monthValue === 0) {
      this.setState({
        monthValue: 11,
        month: "December",
        year: year - 1
      });
    } else {
      const newMonthValue = monthValue - 1;
      this.setState({
        monthValue: newMonthValue,
        month: this.getMonthNameFromMonthValue(newMonthValue)
      });
    }
  };

  setMonthToNextMonth = () => {
    const { monthValue, year } = this.state;
    if (monthValue === 11) {
      this.setState({
        monthValue: 0,
        month: "January",
        year: year + 1
      });
    } else {
      const newMonthValue = monthValue + 1;
      this.setState({
        monthValue: newMonthValue,
        month: this.getMonthNameFromMonthValue(newMonthValue)
      });
    }
  };

  render() {
    const { monthValue, month, year } = this.state;
    return (
      <div style={{ width: "70%", margin: "0 auto" }}>
        <div
          className="dashboard-header-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "50px 0",
            fontSize: "28px"
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={this.setMonthToPreviousMonth}
          >
            &#60;
          </div>{" "}
          <div>
            {month} {year}
          </div>{" "}
          <div style={{ cursor: "pointer" }} onClick={this.setMonthToNextMonth}>
            &#62;
          </div>
        </div>

        <Calendar month={month} monthValue={monthValue} year={year} />
      </div>
    );
  }
}

export default Dashboard;
