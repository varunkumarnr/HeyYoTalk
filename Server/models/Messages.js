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
    required: true,
    default: EventType.MESSAGE
  },
  TimeStamp: {
    type: Date,
    default: Date.now
  }
});
let channelMessages = mongoose.model("Message", messageSchema);
module.exports = { channelMessages, EventType };
