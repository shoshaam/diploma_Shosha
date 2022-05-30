import {
  FETCH_LANDMARK_START,
  FETCH_LANDMARK_FAIL,
  FETCH_LANDMARK_SUCCESS,
} from "../actions/types";

const initialState = {
  loading: true,
  data: [],
};

const landmarkReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_LANDMARK_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LANDMARK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_LANDMARK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default landmarkReducer;
