import React from "react";
import classnames from "classnames";
import BackArrow from "../mobile/BackArrow";
import CloseFormButton from "./CloseFormButton";

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
      {props.isMobile ? (
        <BackArrow goBack={goBack} />
      ) : (
        <CloseFormButton hideModal={props.hideModal} />
      )}

      <h1 className="text-center">{getFormHeaderContent(props.formType)}</h1>
      {props.errors.error && (
        <small className="text-danger text-center">{props.errors.error}</small>
      )}
    </div>
  );
};

export default FormHeader;
