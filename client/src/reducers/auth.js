import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action?.payload);
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      console.log(state);
      return { authData: action?.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      return {};
    default:
      return state;
  }
}

export default authReducer;