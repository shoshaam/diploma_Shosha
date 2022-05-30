import {
    FETCH_CATEGORY_START,
    FETCH_CATEGORY_FAIL,
    FETCH_CATEGORY_SUCCESS,
  } from "../actions/types";
  
  const initialState = {
    loading: true,
    data: [],
  };
  
  const categoryReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case FETCH_CATEGORY_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FETCH_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  