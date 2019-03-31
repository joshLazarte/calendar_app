import React, { Component } from "react";
import Calendar from "../calendar/Calendar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvents } from "../../actions/eventActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthValue: new Date().getMonth(),
      month: this.getMonthNameFromMonthValue(new Date().getMonth()),
      year: new Date().getFullYear(),
      events: []
    };
  }

  componentDidMount() {
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
    const { loading } = this.props.event;

    let dashboardContent;

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
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
            <div
              style={{ cursor: "pointer" }}
              onClick={this.setMonthToNextMonth}
            >
              &#62;
            </div>
          </div>

          <Calendar month={month} monthValue={monthValue} year={year} />
        </div>
      );
    }

    return <div>{dashboardContent}</div>;
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
