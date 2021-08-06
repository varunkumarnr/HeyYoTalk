const Server = require("../models/Server");
const Channel = require("../models/channel");
const User = require("../models/user");
const { ChannelMessage, EventType } = require("../models/Messages");
const { validationResult } = require("express-validator");
const Util = require("../middleware/utils");

const getMessages = async (req, res) => {
  const currentUserId = req.user.id;
  const CurrentChannelId = req.params.channelId;
  const CurrentServerId = req.params.serverId;
  const CheckMem = await Util.isUser(currentUserId, CurrentServerId);
  if (CheckMem === false) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "You must be member to view chat " }]
    });
  }
  try {
    let channel = await ChannelMessage.find({
      channelId: CurrentChannelId
    })
      .populate(
        "sender",
        "-password -description -status -email -friend_req -friends -servers"
      )
      .limit(50)
      .then(rdata => {
        return res.status(200).json({ success: true, data: rdata });
      });
  } catch (err) {}
};

const sendMessages = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const currentUserId = req.user.id;
  const CurrentChannelId = req.params.channelId;
  const CurrentServerId = req.params.serverId;
  const { text } = req.body;
  const CheckMem = await Util.isUser(currentUserId, CurrentServerId);
  if (CheckMem === false) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: "You must be member to view chat " }]
    });
  }
  try {
    let chat = new ChannelMessage({
      sender: currentUserId,
      text: text,
      channelId: CurrentChannelId,
      EventType: EventType.MESSAGE
    });
    let message = await chat.save();
    return res.status(200).json({ success: true, data: chat });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ success: false, errors: [{ msg: "server error" }] });
  }
};
module.exports = { sendMessages, getMessages };
