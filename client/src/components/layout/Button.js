import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({
  padding,
  display,
  link,
  text,
  color,
  fontSize,
  margin,
  backgroundColor
}) => {
  return (
    <Link
      to={link}
      style={{
        textDecoration: "none",
        color: color,
        margin: margin,
        display: display,
        padding: padding,
        backgroundColor: backgroundColor,
        fontSize: fontSize
      }}
    >
      {text}
    </Link>
  );
};

Button.defaultProps = {
  display: "inline-block",
  color: "white",
  padding: "10px 15px",
  fontSize: "18px",
  margin: "0"
};

Button.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired
};

export default Button;
