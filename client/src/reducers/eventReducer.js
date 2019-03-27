import { GET_EVENTS } from "../actions/types";

const initialState = {
  events: [],
  selectedEvent: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
  }
}
