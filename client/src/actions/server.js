import axios from "axios";
import { setAlert } from "./alert";
// import setAuthToken from "../util/SetAuthToken";
import {
  CREATE_SERVER,
  SERVER_ERROR,
  GET_USER_SERVERS,
  GET_SERVER_BY_ID,
  JOIN_SERVER
} from "../types";
const URL = process.env.REACT_APP_BACKEND_URL;

export const createServer = name => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name });
  // console.log(body);
  try {
    const res = await axios.post(
      URL + "/api/server/createserver",
      body,
      config
    );
    dispatch({
      type: CREATE_SERVER,
      payload: res.data.data
    });

    dispatch(setAlert("Server Created", "success"));
    return res.data.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        setAlert(error.msg, "danger");
      });
    }
    dispatch({
      type: SERVER_ERROR
    });
  }
};
export const getUserServers = () => async dispatch => {
  try {
    const res = await axios.get(URL + "/api/user/servers");
    // console.log(res.data);
    dispatch({
      type: GET_USER_SERVERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const getServerById = id => async dispatch => {
  try {
    const res = await axios.get(URL + `/api/server/view/${id}`);
    dispatch({
      type: GET_SERVER_BY_ID,
      payload: res.data.data
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const joinServer = name => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const body = JSON.stringify({ name });
    const res = await axios.post(URL + "/api/server/joinserver", body, config);
    dispatch({
      type: JOIN_SERVER,
      payload: res.data.data
    });
    console.log(res.data.data);
    dispatch(setAlert("Server Joined", "success"));
    return res.data.data;
  } catch (err) {
    console.log(err.message);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
