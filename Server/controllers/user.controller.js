const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/db");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Server = require("../models/Server");
const Channel = require("../models/channel");
const { Message, EventType } = require("../models/Messages");
const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { username, email, password } = req.body;
  let exisitingUser;
  try {
    exisitingUser = await User.findOne({
      $or: [{ email: email }, { username: username }]
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "signing up failed, please try again!" }]
    });
  }
  if (exisitingUser) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "email or username, already exists" }]
    });
  }
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "signing up failed, please try again" }]
    });
  }
  const profileImages = [
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic1_jay2ch.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic2_uufmdu.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635407/Alliance%20chat/pic3_x0kjks.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic4_vty8zj.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic5_dxjeha.jpg"
  ];
  const RandomNo = Math.floor(Math.random() * 5);
  const createdUser = new User({
    username,
    email,
    password,
    profle_picture: profileImages[RandomNo],
    servers: [],
    friends: [],
    friend_req: []
  });
  try {
    await createdUser.save();
    res.status(200).json({ success: true, data: createdUser });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "signing up failed, please try again!" }]
    });
  }
};

module.exports = { signUp };
