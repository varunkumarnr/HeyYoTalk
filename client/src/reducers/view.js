import { CHANGE_SERVER_VIEW, CHANGE_CHANNEL_VIEW } from "../types";

const initialState = {
  activeServer: {},
  activeChannel: {}
};
export function viewReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SERVER_VIEW:
      return {
        ...state,
        activeServer: action.payload,
        activeChannel: action.payload?._channels[0]
      };
    case CHANGE_CHANNEL_VIEW:
      return {
        ...state,
        activeChannel: action.payload
      };
    // case ADD_CHANNEL_TO_SERVER:
    //   return {
    //     ...state,
    //     activeServer: {
    //       ...state.activeServer,
    //       _channels: [...state.activeServer._channels, action.payload.channel]
    //     }
    //   };

    default:
      return state;
  }
}
