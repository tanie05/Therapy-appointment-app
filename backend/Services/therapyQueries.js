const Therapy = require("../Models/therapyModel");

async function fetchTherapyWithId(therapyId) {
  try {
    const therapy = await Therapy.findById(therapyId);
    return therapy;
  } catch (error) {
    console.error("Error fetching therapy:", error);
    throw error;
  }
}

const addTherapy = async (data) => {
  try {
    const result = await Therapy.create(data);

    return result;
  } catch (err) {
    throw err;
  }
};

const getTherapy = async (page, pageSize, email, accessCode) => {
  try {
    const filter = {};
    if (email.length) filter.email = email;
    if (accessCode.length) filter.status = accessCode;
    console.log(filter);
    const total = await Therapy.countDocuments(filter);
    console.log(total, page * pageSize, email, accessCode);
    if (total <= page * pageSize) return { data: [], total };
    const result = await Therapy.find(filter)

      .skip(page * pageSize)
      .limit(pageSize);

    return { data: result, total };
  } catch (err) {
    throw err;
  }
};

const deleteTherapyById = async (id) => {
  try {
    const result = await Therapy.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

const updateTherapyById = async (id, data) => {
  try {
    const result = await Therapy.updateOne({ _id: id }, { $set: data });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addTherapy,
  getTherapy,
  deleteTherapyById,
  updateTherapyById,
  fetchTherapyWithId,
};
