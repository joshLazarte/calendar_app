import axios from "axios";
import { GET_ERRORS, GET_EVENTS, EVENTS_LOADING } from "./types";

//Get Events
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/api/event/all`)
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

//Add Event
export const addEvent = (event, history) => dispatch => {
  axios
    .post(`/api/event/new`, event)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set loading to true, display spinner
export const setEventLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};
