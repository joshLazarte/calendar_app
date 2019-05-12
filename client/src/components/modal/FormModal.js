import React, { Component } from "react";
import ReactDOM from "react-dom";
import EventForm from "../events/EventForm";
import PropTypes from "prop-types";
const modalContainer = document.getElementById("form-modal");

class FormModal extends Component {
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
          disabled={this.props.disabled}
          hideModal={this.props.hideModal}
          eventToDisplay={this.props.eventToDisplay}
          formType={this.props.formType}
        />
      </div>,
      this.el
    );
  }
}

FormModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  event: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  eventToDisplay: PropTypes.object,
  formType: PropTypes.string.isRequired
};

export default FormModal;
