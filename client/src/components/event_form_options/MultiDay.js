import React, { Component } from "react";
import InputGroup from "../common/InputGroup";

export default class MultiDay extends Component {
  render() {
    return (
      <div className="form-group row">
        <div className="col-sm-6">
          <label htmlFor="startDate">Start Date</label>
          <InputGroup
            placeholder="Start Date"
            name="startDate"
            type="Date"
            value={this.props.values[0]}
            onChange={this.props.onChange}
            error={this.props.errors[0]}
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="endDate">End Date</label>
          <InputGroup
            placeholder="End Date"
            name="endDate"
            type="Date"
            value={this.props.values[1]}
            onChange={this.props.onChange}
            error={this.props.errors[1]}
          />
        </div>
      </div>
    );
  }
}
