import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import DashBoard from "./components/dashboard/Dashboard";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

//Auto setCurrentUser or logoutUser
if (localStorage.user && localStorage.TTL) {
  if (
    JSON.parse(localStorage.TTL) < JSON.parse(localStorage.user).loggedInTime
  ) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div
            style={{
              backgroundColor: "lightblue",
              height: "100vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={DashBoard} />
            </Switch>
            <div style={{ flex: 1 }} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
