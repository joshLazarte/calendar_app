import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import autoLogOutIfNeeded from "../../validation/autoLogOut";
import CheckboxInput from "../common/CheckboxInput";
import Spinner from "../common/Spinner";
import FormHeader from "../event_form_components/FormHeader";
import NameDescriptionAndLocation from "../event_form_components/NameDescriptionAndLocation";
import FrequencyOptionsField from "../event_form_components/FrequencyOptionsField";
import FrequencyValueFields from "../event_form_components/FrequencyValueFields";
import StartAndEndTime from "../event_form_components/StartAndEndTime";
import FormActionButtons from "../event_form_components/FormActionButtons";
import AttendeeFields from "../event_form_components/AttendeeFields";
import {
  addEvent,
  deleteEvent,
  stageAttendee,
  unstageAttendee,
  removeAttendee,
  clearErrors
} from "../../actions/eventActions";

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

    this.onUnstageAttendeeClick = this.onUnstageAttendeeClick.bind(this);
  }

  async componentDidMount() {
    autoLogOutIfNeeded();
    this.props.clearErrors();

    if (this.state.eventID && this.props.eventToDisplay.attendees.length > 1) {
      const { attendees } = this.props.eventToDisplay;
      const { userName } = this.props.auth.user;
      for (let attendee of attendees) {
        if (attendee.userName !== userName) {
          await this.props.stageAttendee(attendee.userName);
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.event.stagedAttendees.forEach(attendee => {
      this.props.unstageAttendee(attendee);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.frequency !== this.state.frequency) {
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

  onUnstageAttendeeClick(e, attendee) {
    e.target.blur();
    e.preventDefault();
    this.props.unstageAttendee(attendee);
  }

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

  userOwnsEvent = () => {
    if (this.state.eventID) {
      return (
        this.props.eventToDisplay.createdBy.userName ===
        this.props.auth.user.userName
      );
    }
  };

  removeUserFromEvent(user, e) {
    e.preventDefault();
    this.props.removeAttendee(this.state.eventID, user, this.props.history);
  }

  deleteEvent = () => {
    this.props.deleteEvent(this.state.eventID, this.props.history);
  };

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
    addEvent(eventData, history, this.props.hideModal);
  };

  render() {
    const currentUser = this.props.auth.user.userName;
    const { stagedAttendees, attendeeLoading } = this.props.event;
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto">
            <div className="card control-overflow">
              <FormHeader
                errors={errors}
                hideModal={this.props.hideModal}
                formType={this.state.formType}
              />
              <div className="card-body">
                {attendeeLoading && this.state.formType === "READONLY" ? (
                  <Spinner />
                ) : (
                  <form onSubmit={this.onSubmit}>
                    <NameDescriptionAndLocation
                      values={[
                        this.state.name,
                        this.state.description,
                        this.state.location
                      ]}
                      disabled={this.state.disabled}
                      errors={[
                        errors.name,
                        errors.description,
                        errors.location
                      ]}
                      onChange={this.onChange}
                    />
                    <FrequencyOptionsField
                      onChange={this.onChange}
                      disabled={this.state.disabled}
                      errors={errors}
                      frequency={this.state.frequency}
                    />
                    <FrequencyValueFields
                      props={this.state}
                      onChange={this.onChange}
                    />
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
                    {this.state.shared && (
                      <AttendeeFields
                        stagedAttendees={stagedAttendees}
                        onAddAttendeeClick={this.onAddAttendeeClick}
                        disabled={this.state.disabled}
                        errors={errors}
                        onChange={this.onChange}
                        attendeeSearchField={this.state.attendeeSearchField}
                        attendeeLoading={attendeeLoading}
                        onDeleteClick={this.onUnstageAttendeeClick}
                        shared={this.state.shared}
                      />
                    )}
                    <FormActionButtons
                      formType={this.state.formType}
                      userOwnsEvent={this.userOwnsEvent()}
                      setEditState={this.setFormToEditState}
                      removeUser={this.removeUserFromEvent.bind(
                        this,
                        currentUser
                      )}
                      deleteEvent={this.deleteEvent}
                    />
                  </form>
                )}
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
  deleteEvent: PropTypes.func.isRequired,
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
  {
    addEvent,
    deleteEvent,
    stageAttendee,
    unstageAttendee,
    removeAttendee,
    clearErrors
  }
)(withRouter(EventForm));
