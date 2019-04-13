import {
  GET_EVENTS,
  EVENTS_LOADING,
  ATTENDEE_LOADING,
  ATTENDEE_NOT_FOUND,
  STAGE_ATTENDEE,
  UNSTAGE_ATTENDEE
} from "../actions/types";

const initialState = {
  events: [],
  selectedEvent: {},
  loading: false,
  stagedAttendees: [],
  attendeeLoading: false
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
        loading: false,
        stagedAttendees: []
      };
    case ATTENDEE_LOADING:
      return {
        ...state,
        attendeeLoading: true
      };
    case ATTENDEE_NOT_FOUND:
      return {
        ...state,
        attendeeLoading: false
      };
    case STAGE_ATTENDEE:
      const existingAttendee = state.stagedAttendees.filter(
        attendee => attendee === action.payload
      );
      return {
        ...state,
        attendeeLoading: false,
        stagedAttendees:
          existingAttendee.length > 0
            ? state.stagedAttendees
            : [...state.stagedAttendees, action.payload]
      };
    case UNSTAGE_ATTENDEE:
      return {
        ...state,
        stagedAttendees: state.stagedAttendees.filter(
          attendee => attendee !== action.payload
        )
      };
  }
}
