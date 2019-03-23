import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            padding: "20px",
            backgroundColor: "green"
          }}
        >
          <span style={{ color: "white" }}>
            &copy; {new Date().getFullYear()} J3L webDesign
          </span>
        </footer>
      </div>
    );
  }
}

export default Footer;
