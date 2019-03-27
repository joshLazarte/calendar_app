import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import { verifyUser } from "./actions/authActions";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import DashBoard from "./components/dashboard/Dashboard";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

//@TODO remove reset auth state after cookie timeout
store.dispatch(verifyUser());

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
            <Route exact path="/dashboard" component={DashBoard} />
            <div style={{ flex: 1 }} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
