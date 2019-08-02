import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register action
export const registerUser = (user, history) => dispatch => {
  axios
    .post("/calendar-app/api/user/register", user)
    .then(res => history.push("/calendar-app/login"))
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
    .post("/calendar-app/api/user/login", user)
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(setCurrentUser(res.data));
    })
    .then(() => history.push("/calendar-app/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Logout action
export const logoutUser = () => dispatch => {
  axios
    .delete("/calendar-app/api/user/logout")
    .then(res => {
      localStorage.removeItem("user");
      dispatch(setCurrentUser({}));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
