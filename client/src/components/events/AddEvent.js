import React, { Component } from "react";
import InputGroup from "../common/InputGroup";
import SelectInputGroup from "../common/SelectInputGroup";
import CheckboxInput from "../common/CheckboxInput";

import NameDescriptionAndLocation from "../event_form_options/NameDescriptionAndLocation";
import Single from "../event_form_options/Single";
import MultiDay from "../event_form_options/MultiDay";
import Weekly from "../event_form_options/Weekly";
import BiWeekly from "../event_form_options/BiWeekly";
import Monthly from "../event_form_options/Monthly";
import StartAndEndTime from "../event_form_options/StartAndEndTime";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent } from "../../actions/eventActions";
import { withRouter } from "react-router-dom";
import autoLogOutIfNeeded from "../../validation/autoLogOut";

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      createdBy: "",
      startDate: "",
      endDate: "",
      allDay: true,
      startTime: "",
      endTime: "",
      description: "",
      type: "",
      location: "",
      shared: false,
      attendees: "",
      errors: {},
      typeOption: "",
      weeklyDay: "",
      biWeeklyType: "",
      biWeeklyWeekday: "",
      monthlyTypeOption: "",
      monthlyDate: "",
      monthlyFrequency: "",
      monthlyWeekday: ""
    };
  }

  componentDidMount() {
    autoLogOutIfNeeded();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }

  toggleAllDay = () => {
    this.setState({ allDay: !this.state.allDay });
  };

  toggleShared = () => {
    this.setState({ shared: !this.state.shared });
  };

  onAddAttendeeClick = e => {
    e.preventDefault();
  };

  onSubmit = e => {
    e.preventDefault();

    const { addEvent, history, auth } = this.props;

    const newEvent = {
      name: this.state.name,
      createdBy: auth.user.userName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description,
      type: this.state.type,
      location: this.state.location,
      attendees: this.state.attendees,
      shared: this.state.shared
    };

    addEvent(newEvent, history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, typeOption } = this.state;
    return (
      <div className="row">
        <div className="col-md-10 col-lg-8 mx-auto">
          <div className="card">
            <div className="card-header text-center">
              <h1>Add Event</h1>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <NameDescriptionAndLocation
                  values={[
                    this.state.name,
                    this.state.description,
                    this.state.location
                  ]}
                  errors={[errors.name, errors.description, errors.location]}
                  onChange={this.onChange}
                />

                <div className="form-group row">
                  <label
                    className="col-form-label col-sm-3"
                    htmlFor="typeOption"
                  >
                    Type
                  </label>
                  <div className="col-sm-8">
                    <SelectInputGroup
                      name="typeOption"
                      options={[
                        "Choose One",
                        "Single",
                        "Multi-Day",
                        "Weekly",
                        "Bi-Weekly",
                        "Monthly"
                      ]}
                      value={this.state.typeOption}
                      onChange={this.onChange}
                      error={errors.type}
                    />
                  </div>
                </div>

                {typeOption === "Single" && (
                  <Single
                    value={this.state.startDate}
                    onChange={this.onChange}
                    error={errors.startDate}
                  />
                )}
                {typeOption === "Multi-Day" && (
                  <MultiDay
                    values={[this.state.startDate, this.state.endDate]}
                    onChange={this.onChange}
                    errors={[errors.startDate, errors.endDate]}
                  />
                )}
                {typeOption === "Weekly" && (
                  <Weekly
                    value={[this.state.weeklyDay]}
                    onChange={this.onChange}
                    error={errors.weeklyDay}
                  />
                )}
                {typeOption === "Bi-Weekly" && (
                  <BiWeekly
                    values={[
                      this.state.biWeeklyType,
                      this.state.biWeeklyWeekday
                    ]}
                    onChange={this.onChange}
                    errors={[errors.biWeeklyType, errors.biWeeklyWeekday]}
                  />
                )}
                {typeOption === "Monthly" && (
                  <Monthly
                    values={[
                      this.state.monthlyTypeOption,
                      this.state.monthlyDate,
                      this.state.monthlyWeekday,
                      this.state.monthlyFrequency
                    ]}
                    onChange={this.onChange}
                    errors={[
                      errors.monthlyTypeOption,
                      errors.monthlyDate,
                      errors.monthlyWeekday,
                      errors.monthlyFrequency
                    ]}
                  />
                )}

                <CheckboxInput
                  name="allDay"
                  value={this.state.allDay}
                  onChange={this.toggleAllDay}
                  checked={this.state.allDay}
                  label="All Day Event"
                />

                {!this.state.allDay && (
                  <StartAndEndTime
                    values={[this.state.startTime, this.state.endTime]}
                    error={errors.startTime}
                    onChange={this.onChange}
                  />
                )}

                <CheckboxInput
                  name="shared"
                  value={this.state.shared}
                  onChange={this.toggleShared}
                  checked={this.state.shared}
                  label="Share This Event"
                />

                {this.state.shared && (
                  <div className="row">
                    <div className="col-sm-5 pr-1">
                      <InputGroup
                        placeholder="Attendee"
                        name="attendees"
                        value={this.state.attendees}
                        onChange={this.onChange}
                        error={errors.attendees}
                      />
                    </div>
                    <div className="col-sm-1 pl-0">
                      <a
                        href="!#"
                        onClick={this.onAddAttendeeClick}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-plus" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="form-group my-5">
                  <button type="submit" className="btn btn-primary btn-block">
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEvent.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEvent }
)(withRouter(AddEvent));
