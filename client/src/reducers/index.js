import { combineReducers } from "redux";
import { alertReducer } from "./alert";
import { authReducer } from "./auth";
import { serverReducer } from "./server";
import { ChannelReducer } from "./channel";
export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  server: serverReducer,
  channel: ChannelReducer
});
