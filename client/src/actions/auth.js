import { formatMs } from "@material-ui/core";
import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // Login
    history.push("/")
  } catch (error) {
    console.log(error);
  }
}
export const signup = (formData, history) => async (dispatch) => {
  try {
    // Register
    history.push("/")
  } catch (error) {
    console.log(error);
  }
}