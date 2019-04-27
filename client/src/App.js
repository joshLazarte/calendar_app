import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import { setCurrentUser } from "./actions/authActions";
import autoLogOutIfNeeded from "./validation/autoLogOut";

import PrivateRoute from "./components/common/PrivateRoute";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import DashBoard from "./components/dashboard/Dashboard";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

//Auto setCurrentUser or logoutUser
if (localStorage.user) {
  autoLogOutIfNeeded();
  store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ minHeight: "100vh" }} className="d-flex flex-column">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={DashBoard} />
              </Switch>
            </div>
            <div style={{ height: "5rem" }} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
