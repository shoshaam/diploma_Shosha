import {
    FETCH_CATEGORY_START,
    FETCH_CATEGORY_FAIL,
    FETCH_CATEGORY_SUCCESS,
  } from "./types";
  import api from "../../api/categories";
  export const fetchCategory = () => (dispatch) => {
    dispatch({
      type: FETCH_CATEGORY_START,
    });
  
    return api.getCategory().then(
      (response) =>
        dispatch({
          type: FETCH_CATEGORY_SUCCESS,
          payload: response.data,
        }),
      (error) =>
        dispatch({
          type: FETCH_CATEGORY_FAIL,
          payload: { error },
        })
    );
  };
  