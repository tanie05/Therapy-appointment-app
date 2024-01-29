const User = require("../Models/userModel");
const { hashPassword } = require("../Utils/authhelper");

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


async function finduserbyemail({ email }) {
  const user = await User.findOne({ email });
  return user;
}
async function createUser(userdetails) {
  try {
    const { firstname, lastname, email, DOB, language, password } = userdetails;
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name: { firstname, lastname },
      email,
      DOB,
      language,
      password: hashedPassword,
    }).save();
    return user;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  finduserbyemail,
  createUser,
  updateUser, 
  doesEmailExist;
};
