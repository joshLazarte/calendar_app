import React, { Component } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputGroup from "../common/InputGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
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

    const { userName, password } = this.state;

    const user = { userName, password };

    this.props.loginUser(user, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, userName, password } = this.state;
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>Log In</h1>
        <form
          style={{ margin: "50px auto", width: "250px" }}
          onSubmit={this.onSubmit}
        >
          <InputGroup
            name="userName"
            placeholder="Username"
            value={userName}
            onChange={this.onChange}
            error={errors.userName}
          />

          <InputGroup
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
            error={errors.password}
          />

          <input
            style={{ display: "block", width: "250px", marginTop: "20px" }}
            type="submit"
            value="Log In"
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
