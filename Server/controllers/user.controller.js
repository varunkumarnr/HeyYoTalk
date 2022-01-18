const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env.jwtsecret;
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
    password: hashedPassword,
    description: "",
    profle_picture: profileImages[RandomNo],
    servers: [],
    friends: [],
    friend_req: []
  });
  try {
    await createdUser.save();
    // res.status(200).json({ success: true, data: createdUser });
    const payload = {
      user: {
        id: createdUser.id
      }
    };
    try {
      jwt.sign(payload, config, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: "signing up failed, please try again!" }]
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "signing up failed, please try again!" }]
    });
  }
};
const Login = async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
    // console.log(existinguser);
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "signing in failed, please try again!" }]
    });
  }
  if (!existinguser) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "Email does not exist, Please signup" }]
    });
  }
  let validPassword;
  try {
    validPassword = await bcrypt.compare(password, existinguser.password);
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "signing in failed, please try again!" }]
    });
  }
  if (!validPassword) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "Invalid password, could not login" }]
    });
  }
  const payload = {
    user: {
      id: existinguser.id
    }
  };
  jwt.sign(payload, config, { expiresIn: 36000 }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
  existinguser.online = true;
  await existinguser.save();
};
// profile
const getUser = async (req, res) => {
  const username = req.params.username;
  if (req.query.skip === undefined) {
    let user;
    try {
      user = await User.findOne({ username: username }).select("-password");
    } catch (err) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: "Server Error" }]
      });
    }
    if (!user) {
      return res
        .status(500)
        .json({ success: false, errors: [{ msg: "User not found" }] });
    }

    return res.json(user);
  }
};
// search
const getUsers = async (req, res) => {
  const { q, skip, limit, id } = req.query;
  let users, length;
  if (limit) {
    try {
      users = await User.find({
        username: { $regex: q },
        _id: { $ne: id }
      })
        .select("username _id")
        .limit(7);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        errros: [{ msg: "Fetching users failed, please try again" }]
      });
    }
    res.json({
      users: users.map(user => {
        return {
          label: user.username,
          value: user._id
        };
      })
    });
  } else {
    try {
      length = await User.find(
        { username: { $regex: q } },
        "-password"
      ).countDocuments();
      users = await User.find({ username: { $regex: q } }, "-password")
        .skip(parseInt(skip))
        .limit(5);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        errors: [{ msg: "Fetching users failed, please try again" }]
      });
    }
    res.json({ users, length });
  }
};
const me = async (req, res) => {
  try {
    const profile = await User.findById(req.user.id).select("-password");
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, errors: [{ msg: "user not authenticated" }] });
    }
    res.json({ success: true, data: profile });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};
const userServers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate(
      "servers",
      "-admin -users -voiceChannel -owner"
    );
    const myServer = currentUser.servers;
    console.log(myServer);
    return res.json(myServer);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};
const logout = async (req, res) => {
  try {
    await User.findById(req.user.id).then(rUser => {
      rUser.online = false;
      rUser.save();
    });
    return res.status(200).json({ success: true, msg: "logged out" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};
// to do
// update
module.exports = { signUp, Login, getUser, getUsers, me, userServers, logout };
