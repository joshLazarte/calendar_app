import React from "react";
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
  const goBack = e => {
    e.preventDefault();
    props.history.goBack();
  };

  return (
    <div
      className={classnames({
        "card-header": !props.isMobile,
        "mb-3": props.isMobile
      })}
    >
      {props.isMobile && (
        <a
          href="!#"
          className="nav-link"
          onClick={goBack}
          style={{ fontSize: "2rem", marginBottom: "-57px" }}
        >
          <i className="fas fa-chevron-left" />
        </a>
      )}

      {!props.isMobile && (
        <a
          href="!#"
          onClick={props.hideModal}
          className="nav-link text-right"
          style={{ fontSize: "25px", marginBottom: "-50px" }}
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
