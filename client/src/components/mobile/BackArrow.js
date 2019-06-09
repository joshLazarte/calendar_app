import React from "react";

const BackArrow = props => {
  return (
    <a
      href="!#"
      className="nav-link"
      onClick={props.goBack}
      style={{
        fontSize: "2rem",
        marginBottom: "-57px",
        marginLeft: "-10px"
      }}
    >
      <i className="fas fa-chevron-left" />
    </a>
  );
};

export default BackArrow;
