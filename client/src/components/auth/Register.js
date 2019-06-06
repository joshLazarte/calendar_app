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
        <h1 className="mb-5 text-center">Sign Up</h1>
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card p-3">
              <form onSubmit={this.onSubmit}>
                <div className="form-group my-3">
                  <InputGroup
                    placeholder="Username"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.onChange}
                    error={errors.userName}
                    disabled={false}
                  />
                </div>

                <div className="form-group my-3">
                  <InputGroup
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    disabled={false}
                  />
                </div>

                <div className="form-group my-3">
                  <InputGroup
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    disabled={false}
                    type="password"
                  />
                </div>

                <div className="form-group my-3">
                  <InputGroup
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                    disabled={false}
                    type="password"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
