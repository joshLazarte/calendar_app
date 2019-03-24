import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer
          style={{
            width: "100%",
            padding: "20px",
            backgroundColor: "green",
            marginTop: "10px"
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
