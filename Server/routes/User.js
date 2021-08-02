const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user.controller");
router.post(
  "/signup",
  [
    check("username", "username is required")
      .not()
      .notEmpty(),
    check("username", "username must be grater then four digits").isLength({
      min: 4
    }),
    check("username", "username should not be greater then 15 digits").isLength(
      {
        max: 15
      }
    ),
    check("username", "No spaces are allowed in the username").custom(
      value => !/\s/.test(value)
    ),
    check("email", "please enter valide email").isEmail(),
    check(
      "password",
      "please enter password of minimum 6 characters"
    ).isLength({ min: 6 })
  ],
  userController.signUp
);
router.post(
  "/login",
  [
    check("email", "please enter valid email").isEmail(),
    check(
      "password",
      "please enter password of minimum 6 characters"
    ).isLength({ min: 6 })
  ],
  userController.Login
);
router.get("/:username", userController.getUser);
router.get("/", userController.getUsers);
module.exports = router;
