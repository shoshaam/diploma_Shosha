import { FETCH_USER_START, FETCH_USER_FAIL, FETCH_USER_SUCCESS } from "./types";
import api from "../../api/users";
export const fetchUser = (userId) => (dispatch) => {
  dispatch({
    type: FETCH_USER_START,
  });

  return api.getUserById(userId).then(
    (response) =>
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_USER_FAIL,
        payload: { error },
      })
  );
};

export const fetchUserByUsernameAndPassword = (username, password) => (dispatch) => {
  dispatch({
    type: FETCH_USER_START,
  });

  return api.getUserByUsernameAndPassword(username, password).then(
    (response) =>
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_USER_FAIL,
        payload: { error },
      })
  );
};

export const fetchUserByUsername = (username) => (dispatch) => {
  dispatch({
    type: FETCH_USER_START,
  });

  return api.getUserByUsername(username).then(
    (response) =>
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_USER_FAIL,
        payload: { error },
      })
  );
};


