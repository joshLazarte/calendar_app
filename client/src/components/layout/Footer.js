import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white p-4 mt-auto">
        &copy; {new Date().getFullYear()} J3L webDesign
      </footer>
    );
  }
}

export default Footer;
