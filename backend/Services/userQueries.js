
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

const userModel = require("../Models/userModel");
const { hashPassword } = require("../Utils/authhelper");

async function finduserbyemail({ email }) {
  const user = await userModel.findOne({ email });
  return user;
}
async function createUser(userdetails) {
  try {
    const { firstname, lastname, email, DOB, language, password } = userdetails;
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
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
  updateUser
};
