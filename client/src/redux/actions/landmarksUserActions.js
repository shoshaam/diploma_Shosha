import {
    FETCH_LANDMARKS_USER_START,
    FETCH_LANDMARKS_USER_FAIL,
    FETCH_LANDMARKS_USER_SUCCESS,
    CREATE_LANDMARKS_USER_START,
    CREATE_LANDMARKS_USER_FAIL,
    CREATE_LANDMARKS_USER_SUCCESS
  } from "./types";
  import api from "../../api/landmarks";
  
  export const fetchLandmarksUser = (userId) => (dispatch) => {
    dispatch({
      type: FETCH_LANDMARKS_USER_START,
    });
  
    return api.getLandmarksByUser(userId).then(
      (response) =>
        dispatch({
          type: FETCH_LANDMARKS_USER_SUCCESS,
          payload: response.data,
        }),
      (error) =>
        dispatch({
          type: FETCH_LANDMARKS_USER_FAIL,
          payload: { error },
        })
    );
  };

  export const createLandmarkList = (landmarkData) => (dispatch) => {
    dispatch({
      type: CREATE_LANDMARKS_USER_START,
    });
  
    return api
      .addLandmarkList({
        id: landmarkData.id,
        rating: landmarkData.rating,
        visit_date: landmarkData.visit_date,
        user_id: landmarkData.user_id,
        landmark_id: landmarkData.landmark_id,
      })
      .then(
        (response) => {
          dispatch({
            type: CREATE_LANDMARKS_USER_SUCCESS,
            payload: response.data,
          });
          dispatch(fetchLandmarksUser(landmarkData.user_id));
        },
        (error) => {
          dispatch({
            type: CREATE_LANDMARKS_USER_FAIL,
            payload: { error },
          });
        }
      );
  };