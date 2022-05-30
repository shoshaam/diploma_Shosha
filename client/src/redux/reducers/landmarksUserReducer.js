import {
    FETCH_LANDMARKS_USER_START,
    FETCH_LANDMARKS_USER_FAIL,
    FETCH_LANDMARKS_USER_SUCCESS,
  } from "../actions/types";
  
  const initialState = {
    loading: true,
    data: [],
  };
  
  const landmarksUserReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case FETCH_LANDMARKS_USER_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_LANDMARKS_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FETCH_LANDMARKS_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      
      default:
        return state;
    }
  };
  
  export default landmarksUserReducer;
  