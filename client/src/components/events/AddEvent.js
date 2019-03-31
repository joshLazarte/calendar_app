import React, { Component } from "react";
import InputGroup from "../common/InputGroup";
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
      errors: {}
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
    const { errors } = this.state;
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "25px" }}>Add Event</h1>
        <form
          style={{ margin: "50px auto", width: "250px" }}
          onSubmit={this.onSubmit}
        >
          <InputGroup
            placeholder="Event Name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />

          <InputGroup
            placeholder="Start Date"
            name="startDate"
            value={this.state.startDate}
            onChange={this.onChange}
            error={errors.startDate}
          />

          <InputGroup
            placeholder="End Date"
            name="endDate"
            value={this.state.endDate}
            onChange={this.onChange}
            error={errors.endDate}
          />

          <InputGroup
            placeholder="Start Time"
            name="startTime"
            value={this.state.startTime}
            onChange={this.onChange}
            error={errors.startTime}
          />

          <InputGroup
            placeholder="End Time"
            name="endTime"
            value={this.state.endTime}
            onChange={this.onChange}
            error={errors.endTime}
          />

          <textarea
            style={{ width: "250px", height: "100px", marginTop: "20px" }}
            placeholder="Event Description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
          />

          <InputGroup
            placeholder="Event Type"
            name="type"
            value={this.state.type}
            onChange={this.onChange}
            error={errors.type}
          />

          <InputGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
          />

          <InputGroup
            placeholder="Shared"
            name="shared"
            value={this.state.shared}
            onChange={this.onChange}
            error={errors.shared}
          />

          <InputGroup
            placeholder="Attendees"
            name="attendees"
            value={this.state.attendees}
            onChange={this.onChange}
            error={errors.attendees}
          />

          <input
            style={{ width: "250px", marginTop: "20px" }}
            type="submit"
            value="Add Event"
          />
        </form>
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
