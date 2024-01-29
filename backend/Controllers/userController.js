const {
  findUserById,
  findAllUsers,
  findAppointmentHistory,
} = require("../Services/userQueries");
const { areTokenAndParameterIdSame } = require("../Utils/userUtils");

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

module.exports = { showUserProfile, showAllUsers, showAppointmentHistory };
