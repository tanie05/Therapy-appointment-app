const doesEmailExists = require("../Utils/userUtils");
const User = require("../Models/userModel");
const updateUser = require("../Services/userQueries");

async function editUser(req, res) {
  const updates = req.body;
  const userId = req.params.id;

  try {
    const emailExists = await doesEmailExists(updates.email, userId);

    if (emailExists) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const updatedUser = await updateUser(userId, updates);

    if (!updatedUser) {
      res.status(404).send({ success: false, message: "user not found" });
    } else {
      res.status(200).send({
        success: true,
        message: "user updated succesfully",
        user: updatedUser,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = editUser;
