import React, { Component } from "react";
import Calendar from "../calendar/Calendar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvents } from "../../actions/eventActions";
import Spinner from "../common/Spinner";
import autoLogOutIfNeeded from "../../validation/autoLogOut";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthValue: new Date().getMonth(),
      month: this.getMonthNameFromMonthValue(new Date().getMonth()),
      year: new Date().getFullYear()
    };
  }

  componentDidMount() {
    autoLogOutIfNeeded();
    this.props.getEvents();
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

  setMonthToPreviousMonth = e => {
    e.preventDefault();
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

  setMonthToNextMonth = e => {
    e.preventDefault();
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
    const { loading } = this.props.event;

    let dashboardContent;

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div className="mb-5">
          <div className="mb-5 mt-1">
            <div className="d-flex justify-content-center align-items-center">
              <a
                className="dashboard-header-content"
                style={{ fontSize: "2rem" }}
                href="!#"
                onClick={this.setMonthToPreviousMonth}
              >
                <i className="fas fa-chevron-left" />
              </a>
              <h1 className="mx-3 dashboard-header-content">
                {month} {year}
              </h1>
              <a
                className="dashboard-header-content"
                style={{ fontSize: "2rem" }}
                href="!#"
                onClick={this.setMonthToNextMonth}
              >
                <i className="fas fa-chevron-right" />
              </a>
            </div>
          </div>

          <Calendar month={month} monthValue={monthValue} year={year} />
        </div>
      );
    }

    return dashboardContent;
  }
}

Dashboard.propTypes = {
  getEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Dashboard);
