import {
    FETCH_CITY_START,
    FETCH_CITY_FAIL,
    FETCH_CITY_SUCCESS,
  } from "../actions/types";
  
  const initialState = {
    loading: true,
    data: [],
  };
  
  const cityReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case FETCH_CITY_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CITY_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FETCH_CITY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default cityReducer;
  