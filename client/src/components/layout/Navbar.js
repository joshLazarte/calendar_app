import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props;

    const authLinks = (
      <a
        onClick={this.onLogoutClick}
        style={{ color: "white", textDecoration: "none" }}
        href="!#"
      >
        Logout
      </a>
    );

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
          {isAuthenticated ? (
            <div style={{ float: "right", marginRight: "25px" }}>
              {authLinks}
            </div>
          ) : null}
        </nav>
      </div>
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
