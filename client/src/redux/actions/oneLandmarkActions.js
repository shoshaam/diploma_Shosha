import {
  FETCH_LANDMARK_START,
  FETCH_LANDMARK_FAIL,
  FETCH_LANDMARK_SUCCESS,
} from "./types";
import api from "../../api/landmarks";
export const fetchLandmark = (landmarkId) => (dispatch) => {
  dispatch({
    type: FETCH_LANDMARK_START,
  });

  return api.getLandmarkById(landmarkId).then(
    (response) =>
      dispatch({
        type: FETCH_LANDMARK_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_LANDMARK_FAIL,
        payload: { error },
      })
  );
};
