import {
  CHANNEL_ERROR,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  FETCH_CHANNEL_BY_ID,
  GET_SERVER_CHANNELS,
} from "../types";

const initialState = {
  channel: null,
  channels: [],
  error: {},
  loading: true,
};

export const ChannelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CHANNEL:
      return {
        ...state,
        channels: [payload, ...state.channels],
        loading: false,
      };
    case FETCH_CHANNEL_BY_ID:
      return {
        ...state,
        channel: payload,
        loading: false,
      };
    case GET_SERVER_CHANNELS:
      return {
        ...state,
        channels: payload,
        loading: false,
      };
    case DELETE_CHANNEL:
      return {
        ...state,
        channels: state.channels.filter((rchannel) => rchannel._id !== payload),
        loading: false,
      };
    case CHANNEL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
