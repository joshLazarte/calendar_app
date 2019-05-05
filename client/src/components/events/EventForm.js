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
import moment from "moment";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addEvent,
  stageAttendee,
  unstageAttendee,
  removeAttendee,
  clearErrors
} from "../../actions/eventActions";
import { withRouter } from "react-router-dom";
import autoLogOutIfNeeded from "../../validation/autoLogOut";
import isEmpty from "../../validation/is-empty";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: props.formType,
      disabled: props.disabled,
      eventID: props.eventToDisplay._id || null,
      name: props.eventToDisplay.name || "",
      createdBy: props.eventToDisplay.createdBy || "",
      startDate: props.eventToDisplay.startDate || "",
      endDate: props.eventToDisplay.endDate || "",
      allDay: props.eventToDisplay.startTime ? false : true,
      startTime: props.eventToDisplay.startTime || "",
      endTime: props.eventToDisplay.endTime || "",
      description: props.eventToDisplay.description || "",
      frequency: props.eventToDisplay.frequency || "",
      location: props.eventToDisplay.location || "",
      shared: props.eventToDisplay.shared || false,
      attendeeSearchField: "",
      errors: {},
      weeklyDay: props.eventToDisplay.weeklyDay || "",
      biWeeklySchedule: props.eventToDisplay.biWeeklySchedule || "",
      biWeeklyDay: props.eventToDisplay.biWeeklyDay || "",
      monthlyType: props.eventToDisplay.monthlyType || "",
      monthlyDate: props.eventToDisplay.monthlyDate || "",
      monthlySchedule: props.eventToDisplay.monthlySchedule || "",
      monthlyDay: props.eventToDisplay.monthlyDay || ""
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

    const eventData = {
      name: this.state.name,
      eventID: this.state.eventID,
      actionType: this.state.formType,
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
      monthlyDay: this.state.monthlyDay,
      unsavedAttendee: this.state.attendeeSearchField
    };

    addEvent(eventData, history);

    this.props.hideModal();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setFormToEditState = e => {
    e.preventDefault();
    this.setState({
      disabled: false,
      formType: "EDIT"
    });
  };

  format = date => {
    return moment(date)
      .utc()
      .format("YYYY-MM-DD");
  };

  userOwnsForm = () => {
    return (
      this.props.eventToDisplay.createdBy.userName ===
      this.props.auth.user.userName
    );
  };

  removeUserFromEvent = () => {
    this.props.removeAttendee(
      this.state.eventID,
      this.props.auth.user.userName,
      this.props.history
    );
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

    let formActionButton, formHeader;

    if (this.state.formType === "ADD") {
      formActionButton = (
        <button type="submit" className="btn btn-primary btn-block">
          Add Event
        </button>
      );
      formHeader = "Add Event";
    } else if (this.state.formType === "READONLY" && this.userOwnsForm()) {
      formActionButton = (
        <button
          onClick={this.setFormToEditState}
          type="button"
          className="btn btn-warning btn-block"
        >
          Edit Event
        </button>
      );
      formHeader = "View Event";
    } else if (this.state.formType === "READONLY" && !this.userOwnsForm()) {
      formActionButton = (
        <button
          onClick={this.removeUserFromEvent}
          type="button"
          className="btn btn-danger btn-block"
        >
          Remove Me From Event
        </button>
      );
      formHeader = "View Event";
    } else if (this.state.formType === "EDIT") {
      formActionButton = (
        <button type="submit" className="btn btn-primary btn-block">
          Update Event
        </button>
      );
      formHeader = "Edit Event";
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto">
            <div className="card control-overflow">
              <div className="card-header">
                <h1 className="text-center">
                  {formHeader}
                  <a
                    href="!#"
                    onClick={this.props.hideModal}
                    className="float-right nav-link"
                  >
                    &times;
                  </a>
                </h1>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <NameDescriptionAndLocation
                    values={[
                      this.state.name,
                      this.state.description,
                      this.state.location
                    ]}
                    disabled={this.state.disabled}
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
                        disabled={this.state.disabled}
                        value={this.state.frequency}
                        onChange={this.onChange}
                        error={errors.frequency}
                      />
                    </div>
                  </div>

                  {frequency === "single" && (
                    <Single
                      value={this.format(this.state.startDate)}
                      onChange={this.onChange}
                      error={errors.startDate}
                      disabled={this.state.disabled}
                    />
                  )}
                  {frequency === "multi-day" && (
                    <MultiDay
                      values={[
                        this.format(this.state.startDate),
                        this.format(this.state.endDate)
                      ]}
                      onChange={this.onChange}
                      errors={[errors.startDate, errors.endDate]}
                      disabled={this.state.disabled}
                    />
                  )}
                  {frequency === "weekly" && (
                    <Weekly
                      value={this.state.weeklyDay}
                      onChange={this.onChange}
                      error={errors.weeklyDay}
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
                    />
                  )}

                  <CheckboxInput
                    name="allDay"
                    value={this.state.allDay}
                    onChange={this.toggleAllDay}
                    checked={this.state.allDay}
                    disabled={this.state.disabled}
                    label="All Day Event"
                  />

                  {!this.state.allDay && (
                    <StartAndEndTime
                      values={[this.state.startTime, this.state.endTime]}
                      error={errors.startTime}
                      onChange={this.onChange}
                      disabled={this.state.disabled}
                    />
                  )}

                  <CheckboxInput
                    name="shared"
                    value={this.state.shared}
                    onChange={this.toggleShared}
                    checked={this.state.shared}
                    disabled={this.state.disabled}
                    label="Share This Event"
                  />

                  {this.state.shared && isEmpty(this.props.eventToDisplay) && (
                    <div className="row">
                      {stagedAttendees.map(attendee => (
                        <div
                          key={attendee}
                          className="col-sm-6 d-flex align-items-start pt-3"
                        >
                          <InputGroup
                            value={attendee}
                            disabled={true}
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
                          disabled={this.state.disabled}
                        />
                        {addAttendeeButton}
                      </div>
                    </div>
                  )}

                  {!isEmpty(this.props.eventToDisplay) &&
                    this.props.eventToDisplay.attendees.length > 1 && (
                      <div className="row">
                        {this.props.eventToDisplay.attendees.map(attendee => (
                          <InputGroup
                            value={attendee.userName}
                            disabled={true}
                            name={attendee}
                          />
                        ))}
                      </div>
                    )}

                  <div className="form-group my-5">{formActionButton}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired,
  stageAttendee: PropTypes.func.isRequired,
  unstageAttendee: PropTypes.func.isRequired,
  removeAttendee: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEvent, stageAttendee, unstageAttendee, removeAttendee, clearErrors }
)(withRouter(EventForm));
