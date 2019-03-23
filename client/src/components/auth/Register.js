import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { userName, email, password, password2 } = this.state;

    const newUser = { userName, email, password, password2 };

    this.props.registerUser(newUser, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            style={{ display: "block", width: "250px", marginTop: "20px" }}
            type="text"
            placeholder="Username"
            name="userName"
            value={this.state.userName}
            onChange={this.onChange}
          />
          {errors.userName ? <span>{errors.userName}</span> : null}
          <input
            style={{ display: "block", width: "250px", marginTop: "20px" }}
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email ? <span>{errors.email}</span> : null}
          <input
            style={{ display: "block", width: "250px", marginTop: "20px" }}
            type="text"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password ? <span>{errors.password}</span> : null}
          <input
            style={{ display: "block", width: "250px", marginTop: "20px" }}
            type="text"
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors.password2 ? <span>{errors.password2}</span> : null}
          <input
            style={{ display: "block", width: "250px", marginTop: "20px" }}
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
