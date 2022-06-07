import { formatMs } from "@material-ui/core";
import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    
    dispatch({ type: AUTH, payload: data })
    history.push("/")
  } catch (error) {
    console.log(error);
  }
}
export const signup = (formData, history) => async (dispatch) => {
  console.log(formData);
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ type: AUTH, payload: data })
    history.push("/")
  } catch (error) {
    console.log('chla')
    console.log(error);
  }
}