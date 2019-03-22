import React, { Component } from "react";

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
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            value={this.state.userName}
            onchange={this.onChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onchange={this.onChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onchange={this.onChange}
          />
          <input
            type="text"
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            onchange={this.onChange}
          />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default Register;
