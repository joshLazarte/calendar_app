import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register action
export const registerUser = (user, history) => dispatch => {
  axios
    .post("/api/user/register", user)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login action
export const loginUser = (user, history) => dispatch => {
  axios
    .post("/api/user/login", user)
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(setCurrentUser(res.data));
    })
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Logout action
export const logoutUser = history => dispatch => {
  axios
    .delete("/api/user/logout")
    .then(res => {
      localStorage.removeItem("user");
      dispatch(setCurrentUser({}));
    })
    .then(() => history.push("/login"))
    .catch(err =>
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
      console.log(err)
    );
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
