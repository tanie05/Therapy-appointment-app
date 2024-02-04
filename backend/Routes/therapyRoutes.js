const express = require("express");
const router = express.Router();

const {
  createTherapy,
  getAllTherapies,
  deleteTherapy,
  updateTherapy,
  fetchSingleTherapy
} = require("../Controllers/therapyController");
const authMiddleware = require('../Middlewares/authMiddleware');


router.post("/create", authMiddleware, createTherapy);

router.get("/", authMiddleware, getAllTherapies);

router.put("/:id", authMiddleware, updateTherapy);

router.delete("/:id",authMiddleware,  deleteTherapy);

router.get("/history", authMiddleware,  (req, res) => {
  // get request by user to view his appointments
});

router.get("/:id", fetchSingleTherapy)

module.exports = router;