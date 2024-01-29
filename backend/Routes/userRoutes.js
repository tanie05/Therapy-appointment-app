const express = require("express");
const router = express.Router();

const {
  showUserProfile,
  showAllUsers,
  showAppointmentHistory,
  editUser
} = require("../Controllers/userController");

// get request by admin to view all users
router.get("/", showAllUsers);

// get request by users to view their own profile
router.get("/:id", showUserProfile);

// get request by user to view his appointments
router.get("/history/:id", showAppointmentHistory);

// put request to edit user
router.put("/:id", editUser);


module.exports = router;