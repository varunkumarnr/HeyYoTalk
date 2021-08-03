var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const shortId = require("shortid");
var ServerSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    icon: {
      type: String
    },
    uniqueId: {
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
