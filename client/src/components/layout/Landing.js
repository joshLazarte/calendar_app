import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "./Button";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <h1
          style={{ paddingTop: "20%", textAlign: "center", fontSize: "32px" }}
        >
          MERN Calendar App
        </h1>
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <Button
            link="/register"
            margin="0 25px 0 0"
            backgroundColor="green"
            text="Sign Up"
          />
          <Button link="/login" backgroundColor="blue" text="Login" />
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
