var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const shortId = require("shortid");
var ServerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default:
        "https://res.cloudinary.com/varunnrk/image/upload/v1628052738/Alliance%20chat/unicorn-plain_cjhaid.png"
    },
    // server_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Server"
    // },

    uniqueId: {
      type: String
    },
    server_desc: {
      type: String
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    admin: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel"
      }
    ],
    voiceChannel: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel"
      }
    ]
  },
  {
    timestamps: true
  }
);
ServerSchema.pre("save", async function(next) {
  this.uniqueId = await shortId.generate();
  next();
});
module.exports = mongoose.model("Server", ServerSchema);
