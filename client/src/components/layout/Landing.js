import React from "react";
import Button from "./Button";

const Landing = () => {
  return (
    <div>
      <h1 style={{ paddingTop: "20%", textAlign: "center", fontSize: "32px" }}>
        MERN Calendar App
      </h1>
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <Button
          link="/register"
          margin="0 25px 0 0"
          backgroundColor="green"
          text="Sign Up"
        />
        <Button link="/login" backgroundColor="blue" text="Login" />
      </div>
    </div>
  );
};

export default Landing;
