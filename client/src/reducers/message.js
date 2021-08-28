import { FETCH_MESSAGE } from "../types";

const initialState = {
  messages: [],
  loading: true
};

export const MessageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MESSAGE:
      return {
        ...state,
        messages: payload,
        loading: false
      };
    default:
      return state;
  }
};
