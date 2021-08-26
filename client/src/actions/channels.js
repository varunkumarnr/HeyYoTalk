import axios from "axios";
import {
  CHANNEL_ERROR,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  FETCH_CHANNEL_BY_ID,
  GET_SERVER_CHANNELS
} from "../types";
import { setAlert } from "./alert";
const URL = process.env.REACT_APP_BACKEND_URL;
export const createChannel = (name, serverId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // console.log(name);
    const body = JSON.stringify({ channel_name: name });

    const res = await axios.post(
      URL + `/api/server/${serverId}/channel/new`,
      body,
      config
    );
    dispatch({
      type: CREATE_CHANNEL,
      payload: res.data.data
    });
    dispatch(setAlert("channel created succesfully", "success"));
    return res.data.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: CHANNEL_ERROR,
      payload: errors
    });
  }
};
export const FetchAllChannelsOfServer = serverId => async dispatch => {
  try {
    const res = await axios.get(URL + `/api/server/view/${serverId}`);
    dispatch({
      type: GET_SERVER_CHANNELS,
      payload: res.data.data.channels
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CHANNEL_ERROR,
      payload: errors
    });
  }
};
export const FetchChannelById = (serverId, channelId) => async dispatch => {
  try {
    const res = await axios.get(
      URL + `/api/server/${serverId}/channel/${channelId}`
    );
    dispatch({
      type: FETCH_CHANNEL_BY_ID,
      payload: res.data.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CHANNEL_ERROR,
      payload: errors
    });
  }
};
export const DeleteChannel = (serverId, channelId) => async dispatch => {
  try {
    const res = await axios.delete(
      URL + `api/server/${serverId}/channel/${channelId}/delete`
    );
    dispatch({
      type: DELETE_CHANNEL
    });
    dispatch(setAlert("Channel deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CHANNEL_ERROR,
      payload: errors
    });
  }
};
