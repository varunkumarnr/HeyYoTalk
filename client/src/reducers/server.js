import { CREATE_SERVER, GET_USER_SERVERS, GET_SERVER_BY_ID } from "../types";

const initialState = {
  guilds: [],
  guild: null,
  error: {},
  loading: true,
  owner: null,
  admin: []
};
export const serverReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_SERVER:
      return {
        ...state,
        guilds: [payload, ...state.guilds],
        loading: false
      };
    case GET_USER_SERVERS:
      return {
        ...state,
        guilds: payload,
        loading: false
      };
    case GET_SERVER_BY_ID:
      return {
        ...state,
        guild: payload,
        loading: false
      };
    default:
      return state;
  }
};
