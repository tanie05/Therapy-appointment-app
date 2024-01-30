const Therapy = require("../Models/therapyModel");

const addTherapy = async (data) => {
  try {
    const result = await Therapy.create(data);

    return result;
  } catch (err) {
    throw err;
  }
};

const getTherapy = async (page, pageSize) => {
  try {
    const result = await Therapy.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return result;
  } catch (err) {
    throw err;
  }
};

const deleteTherapyById = async (id) => {
  try {
    const result = Therapy.deleteOne(id);
    return result;
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
};
