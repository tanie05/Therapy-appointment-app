const User = require("../Models/userModel");
const Therapy = require("../Models/therapyModel");
const { hashPassword } = require("../Utils/authhelper");

async function doesEmailExist(email) {
  try {
    // Check if any user with the given email exists
    const users = await User.find({ email: email });

    if (users.length === 0) {
      // No user with the given email, so we can use it
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

async function updateUser(userId, updates) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  } catch (err) {
    if (err.code === 11000 || err.code === 11001) {
      const error = new Error("Duplicate entry");
      error.status = 403;
      throw error;
    }
  }
}

async function finduserbyemail({ email }) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
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

const findAppointmentHistory = async (filter, sort, pageNum) => {
  const pageSize = 5;
  const skipDocuments = (pageNum - 1) * pageSize;
  //filter will have userId, status as well as languages
  try {
    const appointments = await Therapy.find(filter)
      .sort(sort)
      .skip(skipDocuments)
      .limit(pageSize);
    return appointments;
  } catch (err) {
    throw Error;
  }
};

module.exports = {
  finduserbyemail,
  createUser,
  updateUser,
  doesEmailExist,
  findUserById,
  findAllUsers,
  findAppointmentHistory,
};
