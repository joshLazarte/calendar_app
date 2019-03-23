import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav
          style={{
            width: "100%",
            padding: "20px",
            backgroundColor: "blue"
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "18px",
              textDecoration: "none",
              color: "white"
            }}
          >
            Calendar App
          </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
