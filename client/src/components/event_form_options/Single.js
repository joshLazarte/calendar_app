import React, { Component } from "react";
import InputGroup from "../common/InputGroup";

class Single extends Component {
  render() {
    return (
      <div className="form-group row">
        <label className="col-form-label col-sm-3" htmlFor="startDate">
          Date
        </label>
        <div className="col-sm-8">
          <InputGroup
            placeholder="Date"
            name="startDate"
            type="Date"
            value={this.props.value}
            onChange={this.props.onChange}
            error={this.props.error}
          />
        </div>
      </div>
    );
  }
}

export default Single;
