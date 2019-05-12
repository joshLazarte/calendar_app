import React, { Component } from "react";
import ReactDOM from "react-dom";
import Confirm from "./Confirm";
import PropTypes from "prop-types";
const modalContainer = document.getElementById("confirm-modal");

class ConfirmModal extends Component {
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
        <Confirm
          message={this.props.message}
          handleConfirm={this.props.handleConfirm}
          handleDecline={this.props.handleDecline}
        />
      </div>,
      this.el
    );
  }
}

ConfirmModal.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleDecline: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default ConfirmModal;
