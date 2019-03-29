import { GET_EVENTS, EVENTS_LOADING } from "../actions/types";

const initialState = {
  events: [],
  selectedEvent: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case EVENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
  }
}
