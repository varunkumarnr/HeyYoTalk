const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventType = {
  MESSAGE: 0,
  JOIN: 1,
  SERVER: 2
};
const messageSchema = new Schema({
  text: {
    type: String
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  channelId: {
    type: String
  },
  event_type: {
    type: Number,
    default: EventType.MESSAGE
  },
  TimeStamp: {
    type: Date,
    default: Date.now
  }
});
let ChannelMessage = mongoose.model("Message", messageSchema);
module.exports = { ChannelMessage, EventType };
