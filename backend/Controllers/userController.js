const {

  validateDateOfBirth,
  validateEmail,
  validatePassword,
  areTokenAndParameterIdSame
} = require("../Utils/userUtils");
const { 
    finduserbyemail, 
    createUser,
    updateUser, 
    findUserById,
    findAllUsers,
    findAppointmentHistory,
    doesEmailExists
     } = require("../Services/userQueries");
const jwt = require("jsonwebtoken");

async function editUser(req, res) {
  const updates = req.body;
  const userId = req.params.id;

  try {
    if(updates.email)
    {
    const emailExists = await doesEmailExists(updates.email);
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

const showAllUsers = async (req, res) => {
    try {
      const id = "65b73dbe7e74455340231bbf"; //To be taken from token
      const data = await findUserById(id);
      if (data.role !== "admin") {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }
  
      const users = await findAllUsers();
  
      //sends array of users
      res.status(200).json(users);
    } catch (err) {
      res.status(err.status).res({ message: err.message }); //use middleware
    }
  };
  
  const showUserProfile = async (req, res) => {
    try {
      //check whether id from token and params is same
      const id1 = req.params.id,
        id2 = req.params.id; //To be taken from token
  
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
  
      const response = await findUserById(id1);
      const userInfo = {
        name: response.name,
        language: response.language,
        DOB: response.DOB,
        email: response.email,
      };
  
      res.status(200).json(userInfo);
    } catch (err) {
      res.status(err.status).res({ message: err.message }); //use middleware
    }
  };
  
  const showAppointmentHistory = async (req, res) => {
    try {
      //check whether id from token and params is same
      const id1 = req.params.id,
        id2 = req.params.id; //To be taken from token
  
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
    } catch (err) {
      console.log(err);
      res.status(err.status).json({ message: err.message }); //use middleware
    }
  };

module.exports = {
  registerController,
  loginController,
  editUser, showUserProfile, showAllUsers, showAppointmentHistory
};
