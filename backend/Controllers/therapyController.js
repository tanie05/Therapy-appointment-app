const {
  addTherapy,
  getTherapy,
  deleteTherapyById,
  updateTherapyById,
  fetchTherapyWithId
} = require("../Services/therapyQueries");
const { validatePhone, validateAddress } = require("../Utils/therapyUtils");
const ObjectId = require("mongodb").ObjectId;


async function fetchSingleTherapy(req,res) {

    const therapyId = req.params.id;
    const result = await fetchTherapyWithId(therapyId);

    if(result){
        res.status(200).send({success: true, therapy: result})
    }else{
        res.status(404).send({success: false, message: "Therapy not found"});
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

    
    // if (!validatePhone(phone.number) || !validateAddress(rest.address)) {
    //   const error = new Error("Invalid Entries");
    //   error.status = 401;
    //   throw error;
    // }

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

    res.status(200).json(result);
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else res.status(500).json(err.message);
  }
};

const getAllTherapies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page

    const result = await getTherapy(page, pageSize);
    res.status(200).json(result);
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else res.status(500).json(err.message);
  }
};

const deleteTherapy = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const result = await deleteTherapyById(userId);
    res.status(200).json(result);
  } catch (err) {
    if (err.statu) res.status(err.status).json(err.message);
    else res.status(500).json(err.message);
  }
};

const updateTherapy = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const data = req.body;
    if (data.phone && !validatePhone(data.phone.number)) {
      const error = new Error("Invalid Entries");
      error.status = 401;
      throw error;
    }
    const result = updateTherapyById(id, data);
    res.status(200).send(result);
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else res.status(500).json(err.message);
  }
};

module.exports = {
  createTherapy,
  getAllTherapies,
  deleteTherapy,
  updateTherapy,
  fetchSingleTherapy
};
