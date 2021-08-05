const User = require("../models/user");
const Server = require("../models/Server");
const isAdmin = async (userId, ServerId) => {
  let CurrentServer = await Server.findById(ServerId);
  let CurrentUser = await User.findById(userId);
  if (CurrentServer.admin.includes(CurrentUser._id)) {
    return true;
  } else {
    return false;
  }
};

const isUser = async (userId, serverid) => {
  let currentServer = await Server.findById(serverid);
  let currentUser = await User.findById(userId);
  if (currentServer.users.includes(currentUser._id)) {
    return true;
  } else {
    return false;
  }
};
const isOwner = async (userId, serverId) => {
  let currentServer = await Server.findById(serverid);
  if ((currentServer.owner = userId)) {
    return true;
  } else {
    return false;
  }
};
module.exports = { isOwner, isUser, isAdmin };
