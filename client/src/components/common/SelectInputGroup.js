import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectInputGroup = ({
  name,
  onChange,
  options: [...options],
  readOnly,
  error
}) => {
  return (
    <div>
      <select
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
      >
        {options.map(option => (
          <option
            value={option === "Choose One" ? "" : option.toLowerCase()}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SelectInputGroup;
