import axios from "axios";
import { CHANNEL_ERROR, CREATE_CHANNEL } from "../types";
import { setAlert } from "./alert";
const URL = process.env.REACT_APP_BACKEND_URL;
export const createChannel = (name, serverId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name });
    const res = await axios.post(
      URL + `/api/server/:${serverId}/channel/new`,
      body,
      config
    );
    dispatch({
      type: CREATE_CHANNEL,
      payload: res.data.data,
    });
    dispatch(setAlert("channel created succesfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CHANNEL_ERROR,
      payload: errors,
    });
  }
};
