import axios from 'axios';

export default {
  getLandmarks: () => axios.get(`/landmark`),
  getLandmarkById: (landmarkId) => axios.get(`/landmark/${landmarkId}`),
  getLandmarksByUser: (userId) => axios.get(`/user/${userId}/landmarks`),
  createLandmark: (landmark) => axios.post(`/landmark`, landmark),
  addLandmarkList: (landmarklist) => axios.post(`/landmark_in_list`, landmarklist),

  updateLandmark: (landmark) =>
    axios.put(`/landmark`, landmark),
  deleteLandmark: (landmarkId) =>
    axios.delete(`/landmark/${landmarkId}`),
  deleteByUser: (landmark_id) =>
    axios.delete(`/landmark_in_list/${landmark_id}`),
};
