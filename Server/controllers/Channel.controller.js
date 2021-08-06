const Server = require("../models/Server");
const Channel = require("../models/channel");
const { ChannelMessage, EventType } = require("../models/Messages");
const Util = require("../middleware/utils");
const { validationResult } = require("express-validator");
// get all channels of a server

const createChannel = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { channel_name } = req.body;
  const currentServerId = req.params.serverId;
  const currentUser = req.user.id;
  // console.log(currentServerId, currentUser);
  const CheckAdmin = await Util.isAdmin(currentUser, currentServerId);
  if (CheckAdmin === false) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "Only admins can create new channels" }]
    });
  }
  try {
    // let newChannel = new Channel({
    //   channel_name: channel_name
    // });
    // await newChannel.save();
    let server = await Server.findOneAndUpdate({
      _id: currentServerId
    }).then(async rServer => {
      const numberOfChannels = rServer.channels.length;
      if (numberOfChannels > 8) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "8 is the maximum number of channels" }]
        });
      }
      let newChannel = new Channel({
        channel_name: channel_name
      });
      await newChannel.save();
      rServer.channels.push(newChannel._id);
      await rServer.save();
      return res
        .status(200)
        .json({ success: true, data: "Channel successfully created" });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ success: false, msg: "server error" });
  }
};

// delete Channel

module.exports = { createChannel };
