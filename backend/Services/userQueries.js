const userModel = require("../Models/userModel");
const { hashPassword } = require("../Utils/authhelper");

async function finduserbyemail({ email }) {
  try {
    const user = await userModel.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
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
};
