import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

const getFormHeaderContent = formType => {
  switch (formType) {
    case "READONLY":
      return "View Event";
    case "EDIT":
      return "Edit Event";
    default:
      return "Add Event";
  }
};

const FormHeader = props => {
  return (
    <div
      className={classnames({
        "card-header": !props.isMobile,
        "mb-3": props.isMobile
      })}
    >
      {props.isMobile ? (
        <Link className="nav-link" to="/">
          &larr;Back
        </Link>
      ) : (
        <a
          href="!#"
          onClick={props.hideModal}
          className="float-right nav-link"
          style={{ fontSize: "25px" }}
        >
          &times;
        </a>
      )}
      <h1 className="text-center">{getFormHeaderContent(props.formType)}</h1>
      {props.errors.error && (
        <small className="text-danger text-center">{props.errors.error}</small>
      )}
    </div>
  );
};

export default FormHeader;
