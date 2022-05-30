import {
  FETCH_LANDMARKS_START,
  FETCH_LANDMARKS_FAIL,
  FETCH_LANDMARKS_SUCCESS,
  CREATE_LANDMARK_START,
  CREATE_LANDMARK_FAIL,
  CREATE_LANDMARK_SUCCESS,
  DELETE_LANDMARKS_START,
  DELETE_LANDMARKS_FAIL,
  DELETE_LANDMARKS_SUCCESS,
  UPDATE_LANDMARK_START,
  UPDATE_LANDMARK_SUCCESS,
  UPDATE_LANDMARK_FAIL,
} from "./types";
import api from "../../api/landmarks";

export const fetchLandmarks = () => (dispatch) => {
  dispatch({
    type: FETCH_LANDMARKS_START,
  });

  return api.getLandmarks().then(
    (response) =>
      dispatch({
        type: FETCH_LANDMARKS_SUCCESS,
        payload: response.data,
      }),
    (error) =>
      dispatch({
        type: FETCH_LANDMARKS_FAIL,
        payload: { error },
      })
  );
};

export const deleteLandmark = (landmarkId) => (dispatch) => {
  dispatch({
    type: DELETE_LANDMARKS_START,
  });
  return api.deleteLandmark(landmarkId).then(
    (response) => {
      dispatch({
        type: DELETE_LANDMARKS_SUCCESS,
        payload: { success: response, id: landmarkId },
      });
      dispatch(fetchLandmarks());
    },
    (error) => {
      dispatch({
        type: DELETE_LANDMARKS_FAIL,
        payload: { error },
      });
      dispatch(fetchLandmarks());
    }
  );
};

export const deleteLandmarkByUser = (landmark_id) => (dispatch) => {
  dispatch({
    type: DELETE_LANDMARKS_START,
  });
  return api.deleteByUser(landmark_id).then(
    (response) => {
      dispatch({
        type: DELETE_LANDMARKS_SUCCESS,
        payload: { success: response, landmark_id: landmark_id },
      });
      dispatch(fetchLandmarks());
    },
    (error) => {
      dispatch({
        type: DELETE_LANDMARKS_FAIL,
        payload: { error },
      });
      dispatch(fetchLandmarks());
    }
  );
};

export const createLandmark = (landmarkData) => (dispatch) => {
  dispatch({
    type: CREATE_LANDMARK_START,
  });

  return api
    .createLandmark({
      id: landmarkData.id,
      name: landmarkData.name,
      description: landmarkData.authorlandmark,
      picture: landmarkData.picture,
      category_name: landmarkData.category_name,
      city_name: landmarkData.city_name,
      map: landmarkData.map
    })
    .then(
      (response) => {
        dispatch({
          type: CREATE_LANDMARK_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchLandmarks());
      },
      (error) => {
        dispatch({
          type: CREATE_LANDMARK_FAIL,
          payload: { error },
        });
      }
    );
};

export const updateLandmark = (landmarkData) => (dispatch) => {
  dispatch({
    type: UPDATE_LANDMARK_START,
  });

  return api
    .updateLandmark({
      id: landmarkData.id,
      name: landmarkData.name,
      description: landmarkData.description,
      picture: landmarkData.picture,
      category_name: landmarkData.category_name,
      city_name: landmarkData.city_name,
      map: landmarkData.map
    })
    .then(
      () => {
        dispatch({
          type: UPDATE_LANDMARK_SUCCESS,
        });
        dispatch(fetchLandmarks());
      },
      (error) => {
        dispatch({
          type: UPDATE_LANDMARK_FAIL,
          payload: { error },
        });
      }
    );
};

export default fetchLandmarks;
