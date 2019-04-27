import React, { Component } from "react";
import ReactDOM from "react-dom";
import EventForm from "../events/EventForm";
import PropTypes from "prop-types";
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
      <div className="modal d-flex align-items-center">
        <EventForm
          readOnly={this.props.readOnly}
          hideModal={this.props.hideModal}
        />
      </div>,
      this.el
    );
  }
}

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  event: PropTypes.object,
  readOnly: PropTypes.bool.isRequired
};

export default Modal;
