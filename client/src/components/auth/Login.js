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
        <h1 className="text-center mb-5">Login</h1>
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card p-3">
              <form onSubmit={this.onSubmit}>
                <div className="form-group my-3">
                  <InputGroup
                    name="userName"
                    placeholder="User Name"
                    value={userName}
                    onChange={this.onChange}
                    error={errors.userName}
                    disabled={false}
                  />
                </div>

                <div className="form-group my-3">
                  <InputGroup
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChange}
                    error={errors.password}
                    disabled={false}
                    type="password"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign in
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
