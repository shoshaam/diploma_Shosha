import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import landmarksReducer from "./landmarksReducer";
import landmarksUserReducer from "./landmarksUserReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import oneLandmarkReducer from "./oneLandmarkReducer";
import oneUserReducer from "./oneUserReducer";
import cityReducer from "./cityReducer";
import categoryReducer from "./categoryReducer";

const combine = combineReducers({
  routing: routerReducer,
  landmarks: landmarksReducer,
  landmarksUser: landmarksUserReducer,
  users: usersReducer,
  currentUser: authReducer,
  landmark: oneLandmarkReducer,
  user: oneUserReducer,
  cities: cityReducer,
  categories: categoryReducer
});

const reducers = (state, action) => combine(state, action);

export default reducers;
