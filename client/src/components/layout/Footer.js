import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white p-4 mt-auto">
        &copy; {new Date().getFullYear()} 
        <a href="https://jlazarte.com" className="text-white ml-2">
          J3L webDesign
        </a>
      </footer>
    );
  }
}

export default Footer;
