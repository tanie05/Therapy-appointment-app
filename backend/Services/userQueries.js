const User = require("../Models/userModel");

async function updateUser(userId, updates) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (err) {
    return null;
  }
}

module.exports = updateUser;