const User = require("../models/user");
const Server = require("../models/Server");
const Channel = require("../models/channel");
const Message = require("../models/Messages");
const { validationResult } = require("express-validator");
const createServer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { name } = req.body;

  let findExistingServer = await Server.findOne({ name });
  const user = req.user.id;
  if (!user) {
    return res.status(500).json({
      success: false,
      errors: [{ msg: "user not authenticated" }]
    });
  }
  if (findExistingServer) {
    return res.status(500).json({
      success: false,
      errors: [{ msg: "Server name already exists" }]
    });
  }
  try {
    let DefaultChannel = new Channel({
      channel_name: "general"
    });
    await DefaultChannel.save();
    let newServer = new Server({
      name,
      owner: user,
      admin: user,
      users: user,
      channels: DefaultChannel._id
    });
    await newServer.save();
    User.findById(user).then(rUser => {
      rUser.servers.push(newServer._id);
      rUser.save();
    });
    // let createMessage = new Message({});
    return res.status(200).json({ success: true, server: newServer });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};

module.exports = { createServer };
