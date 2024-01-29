const express = require("express");
const router = express.Router();
const {
  showUserProfile,
  showAllUsers,
  showAppointmentHistory,
} = require("../Controllers/userController");

router.get("/", showAllUsers);

// get request by users to view their own profile
router.get("/:id", showUserProfile);

// get request by user to view his appointments
router.get("/history/:id", showAppointmentHistory);

module.exports = router;
