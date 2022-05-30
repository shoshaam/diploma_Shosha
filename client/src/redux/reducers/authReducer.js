import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../actions/types";

const initialState = {
  data: {
    id: localStorage.getItem("id"),
    login: localStorage.getItem("login"),
    password: localStorage.getItem("password"),
    fullname: localStorage.getItem("fullname"),
    birth_date: localStorage.getItem("birth_date"),
    role: localStorage.getItem("role"),
    city: localStorage.getItem("city"),
  },
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("login", action.payload.login);
      localStorage.setItem("password", action.payload.password);
      localStorage.setItem("fullname", action.payload.fullname);
      localStorage.setItem("birth_date", action.payload.birth_date);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("city", action.payload.city);
      return {
        ...state,
        data: action.payload,
      };
    case CLEAR_CURRENT_USER:
      localStorage.removeItem("id");
      localStorage.removeItem("login");
      localStorage.removeItem("password");
      localStorage.removeItem("fullname");
      localStorage.removeItem("birth_date");
      localStorage.removeItem("role");
      localStorage.removeItem("city");
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
