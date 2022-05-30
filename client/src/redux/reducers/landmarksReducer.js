import {
  FETCH_LANDMARKS_START,
  FETCH_LANDMARKS_FAIL,
  FETCH_LANDMARKS_SUCCESS,
  CREATE_LANDMARK_START,
  CREATE_LANDMARK_FAIL,
  CREATE_LANDMARK_SUCCESS,
  DELETE_LANDMARKS_FAIL,
  DELETE_LANDMARKS_SUCCESS,
  UPDATE_LANDMARK_START,
  UPDATE_LANDMARK_SUCCESS,
  UPDATE_LANDMARK_FAIL,
} from "../actions/types";

const initialState = {
  loading: true,
  data: [],
};

const landmarksReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_LANDMARKS_START:
    case CREATE_LANDMARK_START:
    case UPDATE_LANDMARK_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LANDMARKS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_LANDMARKS_FAIL:
    case CREATE_LANDMARK_FAIL:
    case UPDATE_LANDMARK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CREATE_LANDMARK_SUCCESS:
    case UPDATE_LANDMARK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_LANDMARKS_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_LANDMARKS_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };
    default:
      return state;
  }
};

export default landmarksReducer;
