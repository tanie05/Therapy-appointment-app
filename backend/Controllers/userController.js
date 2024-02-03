const {
  validateDateOfBirth,
  validateEmail,
  validatePassword,
  areTokenAndParameterIdSame,
} = require("../Utils/userUtils");
const { comparePassword } = require("../Utils/authhelper");

const {
  finduserbyemail,
  createUser,
  updateUser,
  findUserById,
  findAllUsers,
  findAppointmentHistory,
  doesEmailExists,
} = require("../Services/userQueries");

const jwt = require("jsonwebtoken");

async function editUser(req, res) {
  const updates = req.body;
  const userId = req.params.id;

  try {
    if (updates.email) {
      const emailExists = await finduserbyemail(updates.email);
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
    // console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
}

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
    // console.log(req.body);
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
    if (!user) {
      const error = new Error("user not exist");
      error.status = 400;
      throw error;
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      const error = new Error("Wrong Password");
      error.status = 400;
      throw error;
    } else {
      const token = await jwt.sign({ id: user.id }, "abc", {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({
          token: token,
          user: { name: user.name, _id: user._id, role: user.role },
        });
    }
  } catch (error) {
    next(error);
  }
};
const showAllUsers = async (req, res, next) => {
  try {
    const id = req.user.id; //taken from decoded token
    const data = await findUserById(id);
    if (data.role !== "admin") {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const users = await findAllUsers();

    //sends array of users
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const showUserProfile = async (req, res, next) => {
  try {
    //check whether id from token and params is same
    const id1 = req.params.id,
      id2 = req.user.id; //taken from decoded token

    if (!areTokenAndParameterIdSame(id1, id2)) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const data = await findUserById(id1);
    if (data.role !== "user") {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const userInfo = {
      name: data.name,
      language: data.language,
      DOB: data.DOB,
      email: data.email,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

const showAppointmentHistory = async (req, res) => {
  try {
    //check whether id from token and params is same
    const id1 = req.params.id,
      id2 = req.user.id; //taken from decoded token

    if (!areTokenAndParameterIdSame(id1, id2)) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const data = await findUserById(id1);
    if (data.role !== "user") {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const response = await findAppointmentHistory(id1);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  editUser,
  showUserProfile,
  showAllUsers,
  showAppointmentHistory,
};
