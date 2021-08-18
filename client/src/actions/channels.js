import axios from "axios";
import { CREATE_CHANNEL } from "../types";
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
  } catch (err) {}
};
