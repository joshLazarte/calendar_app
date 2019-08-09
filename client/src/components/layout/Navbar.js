import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormModal from "../modal/FormModal";
import { logoutUser } from "../../actions/authActions";
import Breakpoint from "react-socks";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  showModal = e => {
    e.preventDefault();
    this.setState({
      showModal: true
    });
  };

  hideModal = e => {
    if (e) e.preventDefault();
    this.setState({ showModal: false });
  };

  render() {
    const { isAuthenticated } = this.props;

    const toggleBtn = (
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
    );

    const addEventLink = (
      <li className="nav-item mr-4">
        <Breakpoint medium up>
          <a
            href="!#"
            className="align-middle text-white"
            onClick={this.showModal}
          >
            Add Event
          </a>
        </Breakpoint>
        <Breakpoint small down>
          <Link
            className="align-middle text-white"
            to={{
              pathname: "/calendar-app/event/add",
              state: {
                disabled: false,
                eventToDisplay: {},
                hideModal: null,
                formType: "ADD"
              }
            }}
          >
            Add Event
          </Link>
        </Breakpoint>
      </li>
    );

    const logoutLink = (
      <li className="nav-item">
        <a
          className="align-middle text-white"
          onClick={this.onLogoutClick}
          href="!#"
        >
          Logout
        </a>
      </li>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary p-3 mb-5">
        <div className="container">
          <Link to="/calendar-app" className="navbar-brand">
            Calendar App
          </Link>
          {toggleBtn}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {" "}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <a
                  href="https://jlazarte.com/#projects"
                  className="align-middle text-white"
                >
                  Back to Portfolio
                </a>
              </li>
              {isAuthenticated && addEventLink}
              {isAuthenticated && logoutLink}
            </ul>
            {isAuthenticated && this.state.showModal && (
              <FormModal
                disabled={false}
                hideModal={this.hideModal}
                eventToDisplay={{}}
                formType={"ADD"}
              />
            )}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
