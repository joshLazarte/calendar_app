import React from "react";
import InputGroup from "../common/InputGroup";
import PropTypes from "prop-types";

const NameDescriptionAndLocation = props => {
  return (
    <div>
      <div className="form-group row">
        <label className="col-form-label col-sm-3" htmlFor="name">
          Name
        </label>
        <div className="col-sm-8">
          <InputGroup
            placeholder="Event Name"
            name="name"
            value={props.values[0]}
            onChange={props.onChange}
            error={props.errors[0]}
            disabled={props.disabled}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-form-label col-sm-3" htmlFor="description">
          Description
        </label>
        <div className="col-sm-8">
          <textarea
            className="form-control"
            placeholder="Event Description"
            name="description"
            value={props.values[1]}
            onChange={props.onChange}
            error={props.errors[1]}
            disabled={props.disabled}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-form-label col-sm-3" htmlFor="location">
          Location
        </label>
        <div className="col-sm-8">
          <InputGroup
            placeholder="Event Location"
            name="location"
            value={props.values[2]}
            onChange={props.onChange}
            error={props.errors[2]}
            disabled={props.disabled}
          />
        </div>
      </div>
    </div>
  );
};

NameDescriptionAndLocation.propTypes = {
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.array
};

export default NameDescriptionAndLocation;
