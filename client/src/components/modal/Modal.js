import React, { Component } from "react";
import ReactDOM from "react-dom";
import AddEvent from "../events/AddEvent";
const modalContainer = document.getElementById("modal");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    modalContainer.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        {/* {this.props.event.name}
        <button onClick={this.props.hideModal}>Hide Me</button> */}
        <AddEvent />
      </div>,
      this.el
    );
  }
}

export default Modal;
