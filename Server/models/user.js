const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // channels: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Channel"
  //   }
  // ],
  profle_picture: {
    type: "String",
    default:
      "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic1_jay2ch.jpg"
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  created_At: {
    type: Date,
    default: Date.now
  },
  online: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model("User", UserSchema);
