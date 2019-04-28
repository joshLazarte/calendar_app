import React from "react";
import PropTypes from "prop-types";

const CheckboxInput = ({
  name,
  value,
  onChange,
  type,
  checked,
  disabled,
  label
}) => {
  return (
    <div className="form-check my-4">
      <input
        className="form-check-input"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        checked={checked}
        disabled={disabled}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

CheckboxInput.defaultProps = {
  type: "checkbox"
};

export default CheckboxInput;
