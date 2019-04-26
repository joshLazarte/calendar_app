import React, { Component } from "react";
import ReactDOM from "react-dom";
import ModalContent from "./ModalContent";
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
        <ModalContent
          event={this.props.event}
          handleHideModal={this.props.handleHideModal}
        />
      </div>,
      this.el
    );
  }
}

export default Modal;
