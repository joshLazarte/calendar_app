import React from "react";
import { Link } from "react-router-dom";

const MobileDisplay = props => {
  return (
    <Link
      to={{ pathname: "/events", state: { ...props } }}
      style={{
        width: ".8rem",
        height: ".8rem",
        backgroundColor: "rgba(0, 123, 255, .5)",
        borderRadius: "50%",
        display: "block"
      }}
      className="mx-auto mt-1"
    />
  );
};

export default MobileDisplay;
