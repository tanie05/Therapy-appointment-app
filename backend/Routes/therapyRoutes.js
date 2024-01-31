const express = require("express");
const router = express.Router();
const {fetchSingleTherapy} = require('../Controllers/therapyController');

const {
  createTherapy,
  getAllTherapies,
  deleteTherapy,
  updateTherapy,
} = require("../Controllers/therapyController");
const { fetchTherapyWithId } = require("../Services/therapyQueries");


router.post("/create", createTherapy);

router.get("/", getAllTherapies);

router.put("/:id", updateTherapy);

router.delete("/:id", deleteTherapy);

router.get("/history", (req, res) => {
  // get request by user to view his appointments
});

router.get("/:id", fetchSingleTherapy)

module.exports = router;