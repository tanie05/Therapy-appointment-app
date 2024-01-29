const User = require("../Models/userModel");

async function doesEmailExist(email) {
  try {
    // Check if any user with the given email exists
    const users = await User.find({ email: email });

    if (users.length === 0) {
      // No user with the given email, so we can use it
      return false;
    } 
    else {
      // Users exist with the same email, so return true
      return true;
    }
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}

async function updateUser(userId, updates) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (err) {
    if (err.code === 11000 || err.code === 11001) {
      // Duplicate key error
      console.error('Duplicate key error:', error.message);
      const error = new Error('Duplicate entry');
      error.status = 403;
      throw error;
    }
  }
    throw err;
}

module.exports = updateUser, doesEmailExist;