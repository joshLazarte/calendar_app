import React from "react";
import InputGroup from "../common/InputGroup";

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
            readOnly={props.readOnly}
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
            readOnly={props.readOnly}
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
            readOnly={props.readOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default NameDescriptionAndLocation;