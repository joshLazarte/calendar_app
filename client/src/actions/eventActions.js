import axios from "axios";
import { GET_ERRORS, GET_EVENTS } from "./types";

//Get Events
///api/event/:userName/all
export const getEvents = user => dispatch => {
  axios
    .get(`/api/event/${user}/all`, user)
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
