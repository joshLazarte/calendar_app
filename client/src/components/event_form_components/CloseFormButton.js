import React from "react";

const CloseFormButton = props => {
  return (
    <a
      href="!#"
      onClick={props.hideModal}
      className="nav-link text-right"
      style={{ fontSize: "25px", marginBottom: "-50px" }}
    >
      &times;
    </a>
  );
};

export default CloseFormButton;
