const express = require("express");

const {
  createTherapy,
  getAllTherapies,
  deleteTherapy,
  updateTherapy,
} = require("../Controllers/therapyController");
const router = express.Router();

router.post("/create", createTherapy);

router.get("/", getAllTherapies);

router.put("/:id", updateTherapy);

router.delete("/:id", deleteTherapy);

router.get("/history", (req, res) => {
  // get request by user to view his appointments
});

module.exports = router;
