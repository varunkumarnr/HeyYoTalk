const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const ChannelContoller = require("../controllers/Channel.controller");
router.get("/", (req, res) => {
  res.send("hello world");
});
router.post(
  "/:serverId/channel/new",
  [check("channel_name", "channel name is required").not().notEmpty()],
  auth,
  ChannelContoller.createChannel
);
router.delete(
  "/:serverId/channel/:channelId/delete",
  auth,
  ChannelContoller.deleteChannel
);
router.get(
  "/:serverId/channel/:channelId",
  auth,
  ChannelContoller.getChannelById
);
module.exports = router;
