import React, { Component } from "react";
import ReactDOM from "react-dom";
const tooltip = document.getElementById("tooltip");

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    tooltip.appendChild(this.el);
  }

  componentWillUnmount() {
    tooltip.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      <div className="tooltip-parent">
        <div className="tooltip-content">
          <h5>Hey I'm a tooltip</h5>
          <p>what's up?</p>
        </div>
      </div>,
      this.el
    );
  }
}

export default Tooltip;
