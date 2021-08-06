const User = require("../models/user");
const Server = require("../models/Server");
const Channel = require("../models/channel");
const Message = require("../models/Messages");
const { validationResult } = require("express-validator");
const Util = require("../middleware/utils");
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
    return res.status(200).json({ success: true, data: newServer });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};
// coin using unique code

// not working
const joinServer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { name } = req.body;
  let userid = req.user.id;
  const currentUser = await User.findById(userid);
  // console.log(currentUser);

  if (!userid) {
    return res.status(500).json({
      success: false,
      errors: [{ msg: "user not authenticated" }]
    });
  }
  // console.log(name);
  const CheckServer = await Server.findOne({ name: name });

  if (!CheckServer) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          msg: "No such server"
        }
      ]
    });
  }
  let joinedUser =
    CheckServer &&
    CheckServer.users.filter(async ruser => {
      return await ruser;
    });
  console.log(joinedUser);
  try {
    if (joinedUser.includes(currentUser._id)) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: " your are already in the server" }]
      });
    }

    const server = await Server.findOneAndUpdate({
      name: name
    }).then(rServer => {
      // console.log(rServer._id);
      const numberUser = rServer.users.lenght;
      if (numberUser > 40) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "The server as reached max participants limit" }]
        });
      }
      let userEntry = User.findById(userid).then(rUser => {
        rUser.servers.push(rServer._id);
        rUser.save();
        rServer.users.push(userid);
        rServer.save();
        return res.status(200).json("joined");
      });
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};

//  view server
const viewServer = async (req, res) => {
  const getServerId = req.params.serverId;
  const getUserId = req.user.id;
  const CheckMem = await Util.isUser(getUserId, getServerId);
  if (CheckMem === false) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "You must be memmber to view server " }]
    });
  }
  // console.log(CheckMem);
  try {
    server = await Server.findOne({ _id: getServerId })
      .populate("channels")
      .populate("users")
      .populate("admin")
      .populate("owner");
    return res.status(200).json({ success: true, data: server });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};

// deleteServer member
const deleteServer = async (req, res) => {
  const CurrentServer = req.params.serverId;
  const currentUser = req.user.id;
  const checkOwner = await Util.isOwner(currentUser, CurrentServer);
  if (checkOwner === false) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "Only owner can delete the server" }]
    });
  }
  try {
    await Server.findOneAndRemove({ _id: CurrentServer });
    await Channel.deleteMany({ _id: CurrentServer.channels });
    const removeIndex = await User.servers
      .map(item => item.id)
      .indexOf(CurrentServer);
    User.servers.splice(removeIndex, 1);
    return res.status(200).json("deleted");
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};
module.exports = { createServer, joinServer, viewServer, deleteServer };
