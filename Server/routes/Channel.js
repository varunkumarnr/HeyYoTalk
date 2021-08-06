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
  [
    check("channel_name", "channel name is required")
      .not()
      .notEmpty()
  ],
  auth,
  ChannelContoller.createChannel
);
module.exports = router;
