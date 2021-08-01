const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortId = require("shortid");
const ChannelSchema = new Schema(
  {
    channel_desc: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
      }
    ],
    channel_name: {
      type: String,
      required: true
    },
    uniqueId: {
      type: String
    },
    created_At: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);
ChannelSchema.pre("save", async function(next) {
  this.uniqueId = await shortId.generate();
  next();
});
module.exports = mongoose.model("Channel", ChannelSchema);
