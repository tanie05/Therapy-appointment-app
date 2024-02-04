const {
  validateDateOfBirth,
  validateEmail,
  validatePassword,
  areTokenAndParameterIdSame,
} = require("../Utils/userUtils");
const { comparePassword } = require("../Utils/authhelper");

const { salesforceNewUser } = require("../Services/salesforceApiCalls");

const {
  finduserbyemail,
  createUser,
  updateUser,
  findUserById,
  findAllUsers,
  findAppointmentHistory,
  deleteUser,
  doesEmailExists,
} = require("../Services/userQueries");

const jwt = require("jsonwebtoken");

async function editUser(req, res, next) {
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
      const error = new Error("Internal error while updating");
      error.status = 400;
      throw error;
    } else {
      res.status(200).send({
        success: true,
        message: "user updated succesfully",
        user: updatedUser,
      });
    }
  } catch (err) {
    next(err);
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

    try {
      const response = await salesforceNewUser(user);

      res.status(200).send({ message: "Operation performed successfully" });
    } catch (error2) {
      try {
        const response = await deleteUser(user._id.toString());
      } catch (error3) {
        console.log(
          "Failed to perform revert operation in first database. Synchronization Failed"
        );
        console.log(`user to remove with id : ${user._id.toString()}`);
        throw error3;
      }

      console.log(
        "Failed to save data in second database, reverting information"
      );

      throw error2;
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
      const error = new Error("Email or password not provided");
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
      const error = new Error("User not exist");
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
      res.status(200).json({
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
    function convertDateTimeToDateFormat(dateTimeString) {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with zero if needed
      const day = String(date.getDate()).padStart(2, "0"); // Pad with zero if needed

      return `${year}-${month}-${day}`;
    }

    const formattedDate = convertDateTimeToDateFormat(data.DOB);
    // Output: "2022-02-01"
    const userInfo = {
      name: data.name,
      language: data.language,
      DOB: formattedDate,
      email: data.email,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

const showAppointmentHistory = async (req, res, next) => {
  try {
    //check whether id from token and params is same
    const id1 = req.params.id,
      id2 = req.user.id; //taken from decoded token

    if (!areTokenAndParameterIdSame(id1, id2)) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    // Check user or admin
    const data = await findUserById(id1);
    if (data.role !== "user") {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    let filter = {
      userId: req.params.id,
    };

    if (req.query.status[0] !== "all") {
      filter.status = req.query.status[0];
    }

    if (req.query.language[0] !== "all") {
      filter.language = req.query.language[0];
    }

    let sort = {
      [req.query.sort[0]]: parseInt(req.query.sortValue[0]),
    };

    let pageNum = parseInt(req.query.pageNum[0]);

    const response = await findAppointmentHistory(filter, sort, pageNum);

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
