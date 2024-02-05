const {
  addTherapy,
  getTherapy,
  deleteTherapyById,
  updateTherapyById,
  fetchTherapyWithId,
} = require("../Services/therapyQueries");
const { validatePhone, validateAddress } = require("../Utils/therapyUtils");
const {
  salesforceNewTherapy,
  salesforceUpdateTherapy,
} = require("../Services/salesforceApiCalls");
const ObjectId = require("mongodb").ObjectId;

async function fetchSingleTherapy(req, res) {
  try {
    const therapyId = req.params.id;
    const result = await fetchTherapyWithId(therapyId);
    if (result) {
      res.status(200).send({ success: true, therapy: result });
    } else {
      const error = new Error("Therapy Not Found");
      error.status = 404;
      throw error;
      res.status(404).send({ success: false, message: "Therapy not found" });
    }
  } catch (err) {
    next(err);
  }
}

const createTherapy = async (req, res, next) => {
  try {
    const {
      healthPlan,
      language,
      description,
      timings,
      userId,
      phone,
      email,
      DOB,
      ...rest
    } = req.body;

    if (!validateAddress(rest.address)) {
      const error = new Error();
      error.message = "Invalid house number";
      error.status = 401;
      throw error;
    }

    const therapy = {
      healthPlan,
      language,
      description,
      timings,
      userId: new ObjectId(userId),
      phone,
      email,
      DOB,
      address: rest.address,
      status: "pending",
    };

    const result = await addTherapy(therapy);
    // res.status(200).json(result);

    try {
      const result2 = await salesforceNewTherapy(result);

      res.status(200).json(result);
    } catch (error2) {
      try {
        const response = await deleteTherapyById(result._id.toString());
      } catch (error3) {
        console.log(
          "Failed to perform revert operation in first database. Synchronization Failed"
        );
        console.log(`therapy to remove with id : ${result._id.toString()}`);
        throw error3;
      }

      console.log(
        "Failed to save data in second database, reverting information"
      );

      throw error2;
    }
  } catch (err) {
    next(err);
  }
};

const getAllTherapies = async (req, res, next) => {
  try {
    // console.log(req.query);
    const page = req.query.page ? parseInt(req.query.page) : 0; // Current page number
    const accessCode = req.query.accessCode || "";
    const email = req.query.email || "";
    const pageSize = 10; // Number of items per page

    const result = await getTherapy(page, pageSize, email, accessCode);
    res.status(200).json(result);
  } catch (err) {
    // if (err.status) res.status(err.status).json(err.message);
    // else res.status(500).json(err.message);
    next(err);
  }
};

const deleteTherapy = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const result = await deleteTherapyById(userId);
    res.status(200).json(result);
  } catch (err) {
    // if (err.statu) res.status(err.status).json(err.message);
    // else res.status(500).json(err.message);
    next(err);
  }
};

const updateTherapy = async (req, res, next) => {
  //Salesforce update is assuming that this only updates therapy status
  try {
    const id = new ObjectId(req.params.id);
    const data = req.body;
    if (data.phone && !validatePhone(data.phone.number)) {
      const error = new Error("Invalid Entries");
      error.status = 401;
      throw error;
    }

    const originalTherapy = await fetchTherapyWithId(id);

    const originalStatus = {
      status: originalTherapy.status,
    };

    const result = await updateTherapyById(id, data);

    try {
      const result2 = await salesforceUpdateTherapy(id, data);

      res.status(200).json(result);
    } catch (error2) {
      try {
        const response = await updateTherapyById(id, originalStatus);
      } catch (error3) {
        console.log(
          "Failed to perform revert operation in first database. Synchronization Failed"
        );
        console.log(
          `therapy to remove with id : ${id} and data ${originalStatus}`
        );
        throw error3;
      }

      console.log(
        "Failed to save data in second database, reverting information"
      );

      throw error2;
    }

    res.status(200).send(result);
  } catch (err) {
    // if (err.status) res.status(err.status).json(err.message);
    // else res.status(500).json(err.message);
    next(err);
  }
};

module.exports = {
  createTherapy,
  getAllTherapies,
  deleteTherapy,
  updateTherapy,
  fetchSingleTherapy,
};
