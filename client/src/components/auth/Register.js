import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import InputGroup from "../common/InputGroup";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>Sign Up</h1>
        <form
          style={{ margin: "50px auto", width: "250px" }}
          onSubmit={this.onSubmit}
        >
          <InputGroup
            placeholder="Username"
            name="userName"
            value={this.state.userName}
            onChange={this.onChange}
            error={errors.userName}
          />

          <InputGroup
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          <InputGroup
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />

          <InputGroup
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />

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
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
