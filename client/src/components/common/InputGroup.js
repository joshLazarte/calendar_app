import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({ name, placeholder, value, type, onChange, error }) => {
  return (
    <div>
      <input
        style={{ display: "block", width: "250px", marginTop: "20px" }}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error ? <span>{error}</span> : null}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
