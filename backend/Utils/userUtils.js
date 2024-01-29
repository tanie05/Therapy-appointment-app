const User = require("../Models/userModel");

async function doesEmailExist(email, userId) {
  try {
    // Check if any user with the given email exists
    const users = await User.find({ email: email });

    if (users.length === 0) {
      // No user with the given email, so we can use it
      return false;
    } else if (users.length === 1 && users[0]._id.toString() === userId) {
      // If there is a single user with this email, it should be the user with id equal to userId
      return false;
    } else {
      // Users exist with the same email, so return true
      return true;
    }
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}

module.exports = doesEmailExist;
