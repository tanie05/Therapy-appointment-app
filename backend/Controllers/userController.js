const doesEmailExists = require("../Utils/userUtils");
const User = require("../Models/userModel");
const updateUser = require("../Services/userQueries");

async function editUser(req, res) {
  const updates = req.body;
  const userId = req.params.id;

  try {
    if(updates.email)
    {
    const emailExists = await doesEmailExists(updates.email, userId);
    if (emailExists) {
      return res.status(409).json({ error: "Email already in use." });
    }
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
const {
  validateDateOfBirth,
  validateEmail,
  validatePassword,
} = require("../Utils/userUtils");
const { finduserbyemail } = require("../Services/userQueries");
const { createUser } = require("../Services/userQueries");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  const userDetails = req.body;
  try {
    const { firstname, lastname, email, DOB, language, password } = userDetails;
    if (!firstname || !lastname || !email || !DOB || !password) {
      const error = new Error("All details are required ");
      error.status = 400;
      throw error;
    }
    if (!validateEmail(email)) {
      const error = new Error("Email is not valid");
      error.status = 400;
      throw error;
    }
    if (!validatePassword(password)) {
      const error = new Error("Password less than 6 digit");
      error.status = 400;
      throw error;
    }
    if (!validateDateOfBirth(DOB)) {
      const error = new Error("Invalid age ");
      error.status = 400;
      throw error;
    }
    const existinguser = await finduserbyemail({ email });
    if (existinguser) {
      const error = new Error("User already exist ");
      error.status = 400;
      throw error;
    }
    const user = await createUser(userDetails);
    if (user) {
      res.status(200).send({ message: "User successfully created" });
    }
  } catch (error) {
    next(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("email or password not provided");
      error.status = 400;
      throw error;
    }
    if (!validateEmail(email)) {
      const error = new Error("Email is not valid");
      error.status = 400;
      throw error;
    }
    const user = await finduserbyemail({ email });
    if (user) {
      const token = await jwt.sign({ id: user.id }, "abc", {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  editUser
};
