const express = require("express");
const router = express.Router();
const {editUser} = require("../Controllers/userController");

router.get("/", (req, res) => {
  // get request by admin to view all users
});

router.post("/:id", (req, res) => {
  // get request by user to view his profile
});

// put request to edit user
router.put("/:id", editUser);


module.exports = router;
