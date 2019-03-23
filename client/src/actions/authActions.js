import axios from "axios";
import { GET_ERRORS } from "./types";

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
