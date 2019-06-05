import React from "react";
import { Link } from "react-router-dom";

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
    <div className="card-header">
      {props.isMobile ? (
        <Link
          className="nav-link float-right"
          style={{ fontSize: "25px" }}
          to="/"
        >
          &larr;
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
