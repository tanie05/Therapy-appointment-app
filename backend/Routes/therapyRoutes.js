const express = require("express");
const router = express.Router();

const {
  createTherapy,
  getAllTherapies,
  deleteTherapy,
  updateTherapy,
  fetchSingleTherapy
} = require("../Controllers/therapyController");


router.post("/create", createTherapy);

router.get("/", getAllTherapies);

router.put("/:id", updateTherapy);

router.delete("/:id", deleteTherapy);

router.get("/history", (req, res) => {
  // get request by user to view his appointments
});

router.get("/:id", fetchSingleTherapy)

module.exports = router;