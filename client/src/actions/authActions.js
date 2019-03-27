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
    .then(res => dispatch(setCurrentUser(res.data)))
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Verify logged in
export const verifyUser = () => dispatch => {
  axios
    .get("/api/user/current")
    .then(res => dispatch(setCurrentUser(res.data)))
    .catch(err => dispatch(setCurrentUser({})));
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
