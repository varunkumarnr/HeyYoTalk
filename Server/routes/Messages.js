const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const MessageController = require("../controllers/Message.controller");

router.post(
  "/:serverId/channel/:channelId/message",
  [
    check("text", "type something")
      .not()
      .notEmpty()
  ],
  auth,
  MessageController.sendMessages
);
router.get(
  "/:serverId/channel/:channelId/chat",
  auth,
  MessageController.getMessages
);
module.exports = router;
