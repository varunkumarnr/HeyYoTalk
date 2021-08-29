import axios from "axios";
import { SEND_MESSAGE, FETCH_MESSAGE } from "../types";
const URL = process.env.REACT_APP_BACKEND_URL;
export const FetchMessages = (serverId, channelId) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const res = await axios.get(
    URL + `/api/server/${serverId}/channel/${channelId}/chat`,
    config
  );
  dispatch({
    type: FETCH_MESSAGE,
    payload: res.data.data
  });
  // console.log(res.data.data);
  return res.data.data;
};
export const sendMessage = (serverId, channelId, message) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ text: message });
  const res = await axios.post(
    URL + `/api/server/${serverId}/channel/${channelId}/message`,
    body,
    config
  );
  dispatch({
    type: SEND_MESSAGE,
    payload: res.data.data
  });
};
