import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectInputGroup = ({
  name,
  value,
  onChange,
  options: [...options],
  error
}) => {
  return (
    <div>
      <select
        className={classnames("form-control", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

SelectInputGroup.defaultProps = {
  type: "text"
};

export default SelectInputGroup;
