import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{
          width: "200px",
          margin: "150px auto 0 auto",
          display: "block"
        }}
      />
    </div>
  );
}
