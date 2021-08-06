const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const serverController = require("../controllers/server.controller");
router.get("/", (req, res) => {
  res.send("hello world");
});
router.post(
  "/createserver",
  [
    check("name", "Server name  is required")
      .not()
      .notEmpty(),
    check("name", "Server name must be grater then four digits").isLength({
      min: 4
    }),
    check("name", "Server name should not be greater then 15 digits").isLength({
      max: 15
    })
  ],
  auth,
  serverController.createServer
);
router.post(
  "/joinServer",
  [
    check("name", "name")
      .not()
      .notEmpty()
  ],
  auth,
  serverController.joinServer
);
router.get("/view/:serverId", auth, serverController.viewServer);
router.delete("/delete/:serverId", auth, serverController.deleteServer);
module.exports = router;
