import axios from "axios";
import {
  GET_ERRORS,
  GET_EVENTS,
  EVENTS_LOADING,
  ATTENDEE_LOADING,
  STAGE_ATTENDEE,
  UNSTAGE_ATTENDEE,
  ATTENDEE_NOT_FOUND,
  CLEAR_ERRORS
} from "./types";

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
    .post(`/api/event`, event)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Stage attendee
export const stageAttendee = attendee => dispatch => {
  dispatch(clearErrors());
  dispatch(setAttendeeLoading());
  axios
    .get(`/api/event/attendee/${attendee}`)
    .then(res =>
      dispatch({
        type: STAGE_ATTENDEE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: ATTENDEE_NOT_FOUND
      });
    });
};

//Unstage attendee
export const unstageAttendee = attendee => dispatch => {
  dispatch({
    type: UNSTAGE_ATTENDEE,
    payload: attendee
  });
};

//Unstage attendee
export const removeAttendee = (id, attendee, history) => dispatch => {
  axios
    .delete(`/api/event/${id}/attendee/${attendee}/delete`)
    .then(res => history.push("/"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//set loading to true, display spinner
export const setEventLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};

//set attendeee loading to true, display spinner button
export const setAttendeeLoading = () => {
  return {
    type: ATTENDEE_LOADING
  };
};

//Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
