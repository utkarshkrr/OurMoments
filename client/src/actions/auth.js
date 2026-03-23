import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history.push("/"); 
  } catch (error) {
    alert("Something's wrong. Check credentials or try again later.");
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push("/"); 
  } catch (error) {
    alert("Something's wrong. Check credentials or try again later.");
    console.log(error);
  }
};

