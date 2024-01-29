const User = require("../Models/userModel");
const Therapy = require("../Models/therapyModel");

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
};

const findAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err;
  }
};

const findAppointmentHistory = async (userId) => {
  try {
    const appointments = await Therapy.find({ userId: userId });
    return appointments;
  } catch (err) {
    throw Error;
  }
};

module.exports = {
  findUserById,
  findAllUsers,
  findAppointmentHistory,
};
