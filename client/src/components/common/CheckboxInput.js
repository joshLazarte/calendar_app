import React from "react";
import PropTypes from "prop-types";

const CheckboxInput = ({ name, value, onChange, type, checked, label }) => {
  return (
    <div className="form-check my-4">
      <input
        className="form-check-input"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        checked={checked}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

CheckboxInput.defaultProps = {
  type: "checkbox"
};

export default CheckboxInput;
