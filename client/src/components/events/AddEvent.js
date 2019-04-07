import React, { Component } from "react";
import InputGroup from "../common/InputGroup";
import SelectInputGroup from "../common/SelectInputGroup";
import CheckboxInput from "../common/CheckboxInput";

import Single from "../event_form_options/Single";
import MultiDay from "../event_form_options/MultiDay";
import Weekly from "../event_form_options/Weekly";
import BiWeekly from "../event_form_options/BiWeekly";
import Monthly from "../event_form_options/Monthly";

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
      startTime: "",
      endTime: "",
      description: "",
      type: "",
      location: "",
      shared: "false",
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
                <div className="form-group row">
                  <label className="col-form-label col-sm-3" htmlFor="name">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <InputGroup
                      placeholder="Event Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-sm-3" htmlFor="name">
                    Description
                  </label>
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      placeholder="Event Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-sm-3" htmlFor="name">
                    Location
                  </label>
                  <div className="col-sm-8">
                    <InputGroup
                      placeholder="Event Location"
                      name="location"
                      value={this.state.location}
                      onChange={this.onChange}
                      error={errors.location}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-sm-3" htmlFor="name">
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

                {typeOption === "Single" ? (
                  <Single
                    value={this.state.startDate}
                    onChange={this.onChange}
                    error={errors.startDate}
                  />
                ) : null}

                {typeOption === "Multi-Day" ? (
                  <MultiDay
                    values={[this.state.startDate, this.state.endDate]}
                    onChange={this.onChange}
                    errors={[errors.startDate, errors.endDate]}
                  />
                ) : null}

                {typeOption === "Weekly" ? (
                  <Weekly
                    value={[this.state.weeklyDay]}
                    onChange={this.onChange}
                    error={errors.weeklyDay}
                  />
                ) : null}

                {typeOption === "Bi-Weekly" ? (
                  <BiWeekly
                    values={[
                      this.state.biWeeklyType,
                      this.state.biWeeklyWeekday
                    ]}
                    onChange={this.onChange}
                    errors={[errors.biWeeklyType, errors.biWeeklyWeekday]}
                  />
                ) : null}

                {typeOption === "Monthly" ? (
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
                ) : null}

                <div className="form-check my-4">
                  <CheckboxInput
                    name="shared"
                    value={this.state.shared}
                    onChange={this.onChange}
                  />
                  <label className="form-check-label" htmlFor="shared">
                    All Day Event
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="startTime">Start Time</label>
                    <InputGroup
                      placeholder="Start Time"
                      name="startTime"
                      value={this.state.startTime}
                      onChange={this.onChange}
                      error={errors.startTime}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="endTime">End Time</label>
                    <InputGroup
                      placeholder="End Time"
                      name="endTime"
                      value={this.state.endTime}
                      onChange={this.onChange}
                      error={errors.endTime}
                    />
                  </div>
                </div>
                <div className="form-check my-4">
                  <CheckboxInput
                    name="shared"
                    value={this.state.shared}
                    onChange={this.onChange}
                  />
                  <label className="form-check-label" htmlFor="shared">
                    Share This Event
                  </label>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <form className="form-inline my-3">
                      <InputGroup
                        placeholder="Attendee"
                        name="attendees"
                        value={this.state.attendees}
                        onChange={this.onChange}
                        error={errors.attendees}
                      />

                      <button type="submit" className="btn btn-primary ml-2">
                        <i className="fas fa-plus" />
                      </button>
                    </form>
                  </div>

                  <div className="col-sm-6">
                    <form className="form-inline my-3">
                      <InputGroup
                        placeholder="Attendee"
                        name="attendees"
                        value={this.state.attendees}
                        onChange={this.onChange}
                        error={errors.attendees}
                      />

                      <button type="submit" className="btn btn-primary ml-2">
                        <i className="fas fa-plus" />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="form-group">
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
