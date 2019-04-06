import React from "react";
import PropTypes from "prop-types";

const CheckboxInput = ({ name, value, onChange, type }) => {
  return (
    <input
      className="form-check-input"
      name={name}
      value={value}
      onChange={onChange}
      type={type}
    />
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
