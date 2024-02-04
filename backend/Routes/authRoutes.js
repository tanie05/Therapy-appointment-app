const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../Controllers/userController");
const errorMiddleware = require("../Middlewares/errorMiddleware");

router.post("/signup", registerController, errorMiddleware);

router.post("/login", loginController, errorMiddleware);

module.exports = router;
