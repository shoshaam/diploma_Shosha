import {
    FETCH_CITY_START,
    FETCH_CITY_FAIL,
    FETCH_CITY_SUCCESS,
  } from "./types";
  import api from "../../api/cities";
  export const fetchCity = () => (dispatch) => {
    dispatch({
      type: FETCH_CITY_START,
    });
  
    return api.getCity().then(
      (response) =>
        dispatch({
          type: FETCH_CITY_SUCCESS,
          payload: response.data,
        }),
      (error) =>
        dispatch({
          type: FETCH_CITY_FAIL,
          payload: { error },
        })
    );
  };
  