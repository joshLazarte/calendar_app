import React, { Component } from "react";
import InputGroup from "../common/InputGroup";
import SelectInputGroup from "../common/SelectInputGroup";
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
      <div className="row">
        <div className="col-md-10 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header text-center">
              <h1>Add Event</h1>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                  <label className="col-form-label col-sm-3" htmlFor="name">
                    Event Name
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
                    Event Description
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
                    Event Type
                  </label>
                  <div className="col-sm-8">
                    <SelectInputGroup
                      name="type"
                      options={["Single", "Weekly", "Bi-Weekly", "Monthly"]}
                      value={this.state.type}
                      onChange={this.onChange}
                      error={errors.type}
                    />
                  </div>
                </div>

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

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
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
