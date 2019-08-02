import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/calendar-app/dashboard");
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-5">MERN Calendar App</h1>
        <div className="text-center mt-5">
          <Link to="/calendar-app/login" className="btn btn-primary btn-lg">
            Log In
          </Link>
          <Link to="/calendar-app/register" className="btn btn-success btn-lg ml-3">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
