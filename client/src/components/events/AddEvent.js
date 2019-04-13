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
import {
  addEvent,
  stageAttendee,
  unstageAttendee,
  clearErrors
} from "../../actions/eventActions";
import { withRouter } from "react-router-dom";
import autoLogOutIfNeeded from "../../validation/autoLogOut";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      createdBy: "",
      startDate: "",
      endDate: "",
      allDay: true,
      startTime: "",
      endTime: "",
      description: "",
      frequency: "",
      location: "",
      shared: false,
      attendeeSearchField: "",
      errors: {},
      weeklyDay: "",
      biWeeklySchedule: "",
      biWeeklyDay: "",
      monthlyType: "",
      monthlyDate: "",
      monthlySchedule: "",
      monthlyDay: ""
    };
  }

  componentDidMount() {
    autoLogOutIfNeeded();
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps, prevState) {
    const { frequency } = this.state;
    if (prevState.frequency !== frequency) {
      return this.setState({
        startDate: "",
        endDate: "",
        weeklyDay: "",
        biWeeklySchedule: "",
        biWeeklyDay: "",
        monthlyType: "",
        monthlyDate: "",
        monthlySchedule: "",
        monthlyDay: ""
      });
    }

    if (prevState.monthlyType !== this.state.monthlyType) {
      return this.setState({
        monthlyDate: "",
        monthlySchedule: "",
        monthlyDay: ""
      });
    }
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
    e.target.blur();
    e.preventDefault();
    this.props.stageAttendee(this.state.attendeeSearchField);
    this.setState({ attendeeSearchField: "" });
  };

  onDeleteAttendeeClick(attendee, e) {
    e.target.blur();
    e.preventDefault();
    this.props.unstageAttendee(attendee);
  }

  onSubmit = e => {
    e.preventDefault();

    const { addEvent, history, auth, event } = this.props;

    const attendees = event.stagedAttendees.join(",");
    console.log(attendees);

    const newEvent = {
      name: this.state.name,
      createdBy: auth.user.userName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description,
      frequency: this.state.frequency,
      location: this.state.location,
      attendees,
      shared: this.state.shared.toString(),
      weeklyDay: this.state.weeklyDay,
      biWeeklySchedule: this.state.biWeeklySchedule,
      biWeeklyDay: this.state.biWeeklyDay,
      monthlyType: this.state.monthlyType,
      monthlyDate: this.state.monthlyDate,
      monthlySchedule: this.state.monthlySchedule,
      monthlyDay: this.state.monthlyDay
    };

    addEvent(newEvent, history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { stagedAttendees, attendeeLoading } = this.props.event;
    let addAttendeeButton;

    if (attendeeLoading) {
      addAttendeeButton = (
        <a
          href="!#"
          onClick={e => e.preventDefault()}
          className="btn btn-primary ml-1"
        >
          <i className="fas fa-circle-notch fa-spin" />
        </a>
      );
    } else {
      addAttendeeButton = (
        <a
          href="!#"
          onClick={this.onAddAttendeeClick}
          className="btn btn-primary ml-1"
        >
          <i className="fas fa-plus" />
        </a>
      );
    }

    const { errors, frequency } = this.state;
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
                    htmlFor="frequency"
                  >
                    Frequency
                  </label>
                  <div className="col-sm-8">
                    <SelectInputGroup
                      name="frequency"
                      options={[
                        "Choose One",
                        "Single",
                        "Multi-Day",
                        "Weekly",
                        "Bi-Weekly",
                        "Monthly"
                      ]}
                      value={this.state.frequency}
                      onChange={this.onChange}
                      error={errors.frequency}
                    />
                  </div>
                </div>

                {frequency === "single" && (
                  <Single
                    value={this.state.startDate}
                    onChange={this.onChange}
                    error={errors.startDate}
                  />
                )}
                {frequency === "multi-day" && (
                  <MultiDay
                    values={[this.state.startDate, this.state.endDate]}
                    onChange={this.onChange}
                    errors={[errors.startDate, errors.endDate]}
                  />
                )}
                {frequency === "weekly" && (
                  <Weekly
                    value={this.state.weeklyDay}
                    onChange={this.onChange}
                    error={errors.weeklyDay}
                  />
                )}
                {frequency === "bi-weekly" && (
                  <BiWeekly
                    values={[
                      this.state.biWeeklySchedule,
                      this.state.biWeeklyDay
                    ]}
                    onChange={this.onChange}
                    errors={[errors.biWeeklySchedule, errors.biWeeklyDay]}
                  />
                )}
                {frequency === "monthly" && (
                  <Monthly
                    values={[
                      this.state.monthlyType,
                      this.state.monthlyDate,
                      this.state.monthlyDay,
                      this.state.monthlySchedule
                    ]}
                    onChange={this.onChange}
                    errors={[
                      errors.monthlyType,
                      errors.monthlyDate,
                      errors.monthlyDay,
                      errors.monthlySchedule
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
                    {stagedAttendees.map(attendee => (
                      <div
                        key={attendee}
                        className="col-sm-6 d-flex align-items-start pt-3"
                      >
                        <InputGroup
                          value={attendee}
                          readOnly={true}
                          name={attendee}
                        />
                        <a
                          href="!#"
                          onClick={this.onDeleteAttendeeClick.bind(
                            this,
                            attendee
                          )}
                          value={attendee}
                          className="btn btn-danger ml-1"
                        >
                          <i className="fas fa-ban" />
                        </a>
                      </div>
                    ))}
                    <div className="col-sm-6 d-flex align-items-start pt-3">
                      <InputGroup
                        placeholder="Attendee"
                        name="attendeeSearchField"
                        value={this.state.attendeeSearchField}
                        onChange={this.onChange}
                        error={errors.attendees}
                      />
                      {addAttendeeButton}
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
  addEvent: PropTypes.func.isRequired,
  stageAttendee: PropTypes.func.isRequired,
  unstageAttendee: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEvent, stageAttendee, unstageAttendee, clearErrors }
)(withRouter(AddEvent));
