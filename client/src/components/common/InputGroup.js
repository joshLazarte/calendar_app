import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  name,
  placeholder,
  value,
  type,
  onChange,
  disabled,
  error
}) => {
  return (
    <div>
      <input
        className={classnames("form-control", {
          "is-invalid": error
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
