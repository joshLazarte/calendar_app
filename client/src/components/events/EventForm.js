import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
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
  stageAttendees,
  unstageAttendee,
  unstageAttendees,
  removeAttendee,
  clearErrors
}
from "../../actions/eventActions";
import ConfirmModal from "../modal/ConfirmModal";

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.isMobile = props.location.state ? true : false;

    this.eventToDisplay = this.isMobile ?
      props.location.state.eventToDisplay :
      props.eventToDisplay;
    this.formType = this.isMobile ?
      props.location.state.formType :
      props.formType;
    this.disabled = this.isMobile ?
      props.location.state.disabled :
      props.disabled;

    this.state = {
      formType: this.formType,
      disabled: this.disabled,
      eventID: this.eventToDisplay._id || null,
      name: this.eventToDisplay.name || "",
      createdBy: this.eventToDisplay.createdBy || "",
      startDate: this.eventToDisplay.startDate || "",
      endDate: this.eventToDisplay.endDate || "",
      allDay: this.eventToDisplay.startTime ? false : true,
      startTime: this.eventToDisplay.startTime || "",
      endTime: this.eventToDisplay.endTime || "",
      description: this.eventToDisplay.description || "",
      frequency: this.eventToDisplay.frequency || "",
      location: this.eventToDisplay.location || "",
      shared: this.eventToDisplay.shared || false,
      attendeeSearchField: "",
      errors: {},
      weeklyDay: this.eventToDisplay.weeklyDay || "",
      biWeeklySchedule: this.eventToDisplay.biWeeklySchedule || "",
      biWeeklyDay: this.eventToDisplay.biWeeklyDay || "",
      monthlyType: this.eventToDisplay.monthlyType || "",
      monthlyDate: this.eventToDisplay.monthlyDate || "",
      monthlySchedule: this.eventToDisplay.monthlySchedule || "",
      monthlyDay: this.eventToDisplay.monthlyDay || "",
      showConfirm: false
    };

    this.confirmProps = {
      confirmMessage: `This will delete "${
        this.state.name
      }" and cannot be undone`,
      handleConfirm: this.deleteEvent,
      handleDecline: () => {
        this.setState({ showConfirm: false });
      }
    };

    this.onUnstageAttendeeClick = this.onUnstageAttendeeClick.bind(this);
  }

  componentDidMount() {
    autoLogOutIfNeeded();
    this.props.clearErrors();
    if (this.state.eventID && this.eventToDisplay.attendees.length > 1) {
      const { attendees } = this.eventToDisplay;
      this.props.stageAttendees(attendees.slice(1));
    }
  }

  componentWillUnmount() {
    this.props.unstageAttendees();
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
      if (nextProps.errors.error === "Unauthorized") {
        nextProps.history.push("/calendar-app/login");
        return null;
      }
      else {
        return {
          errors: nextProps.errors
        };
      }
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
    this.props.stageAttendee(
      this.state.attendeeSearchField,
      this.props.history
    );
    this.setState({ attendeeSearchField: "" });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value });
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
        this.eventToDisplay.createdBy.userName === this.props.auth.user.userName
      );
    }
    return null;
  };

  onUnstageAttendeeClick(e, attendee) {
    e.target.blur();
    e.preventDefault();
    this.props.unstageAttendee(attendee);
  }

  removeUserFromEvent = e => {
    e.preventDefault();
    this.props.removeAttendee(
      this.state.eventID,
      this.props.auth.user.userName,
      this.props.history
    );
  };

  deleteEvent = () => {
    this.props.deleteEvent(this.state.eventID, this.props.history);
  };

  askConfirm = type => {
    this.setState({ showConfirm: true });
    if (type === "REMOVE_USER") {
      this.confirmProps.confirmMessage = `This will remove you from "${
        this.state.name
      }" and cannot be undone`;
      this.confirmProps.handleConfirm = this.removeUserFromEvent;
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { addEvent, history, event } = this.props;
    const attendees = event.stagedAttendees.join(",");
    const eventData = {
      name: this.state.name,
      eventID: this.state.eventID,
      actionType: this.state.formType,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      allDay: this.state.allDay,
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
    const { stagedAttendees, attendeeLoading } = this.props.event;
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto">
            <div
              className={classnames({
                "card control-overflow": !this.isMobile
              })}
            >
              <FormHeader
                errors={errors}
                hideModal={this.props.hideModal}
                formType={this.state.formType}
                isMobile={this.isMobile}
                history={this.props.history}
              />
              <div
                className={classnames({
                  "card-body": !this.isMobile
                })}
              >
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
                      formType={this.state.formType}
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
                        formType={this.state.formType}
                      />
                    )}
                    {(this.state.shared ||
                      this.state.formType !== "READONLY") && (
                      <CheckboxInput
                        name="shared"
                        value={this.state.shared}
                        onChange={this.toggleShared}
                        checked={this.state.shared}
                        disabled={this.state.disabled}
                        label="Share This Event"
                      />
                    )}
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
                      askConfirm={this.askConfirm}
                    />
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.showConfirm && (
          <ConfirmModal
            message={this.confirmProps.confirmMessage}
            handleConfirm={this.confirmProps.handleConfirm}
            handleDecline={this.confirmProps.handleDecline}
          />
        )}
      </div>
    );
  }
}

EventForm.propTypes = {
  eventToDisplay: PropTypes.object,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  stageAttendee: PropTypes.func.isRequired,
  stageAttendees: PropTypes.func.isRequired,
  unstageAttendee: PropTypes.func.isRequired,
  unstageAttendees: PropTypes.func.isRequired,
  removeAttendee: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event,
  errors: state.errors
});

export default connect(
  mapStateToProps, {
    addEvent,
    deleteEvent,
    stageAttendee,
    stageAttendees,
    unstageAttendee,
    unstageAttendees,
    removeAttendee,
    clearErrors
  }
)(withRouter(EventForm));
