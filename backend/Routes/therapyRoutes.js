<<<<<<< HEAD
const express = require("express");
=======
const express = require("express")
const router = express.Router()
const fetchSingleTherapy = require('../Controllers/therapyController');
>>>>>>> edit-user-api

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

<<<<<<< HEAD
module.exports = router;
=======
router.get("/", (req, res) => {
    // get request by admin to get all appointments
})

router.put("/:id", (req,res) => {
    // put request by admin to change status of therapy
})

router.delete("/:id", (req,res) => {
    // delete request by admin to delete any appointment
})

router.get("/history", (req,res) => {
    // get request by user to view his appointments
})


router.get("/:id", fetchSingleTherapy)


module.exports = router
>>>>>>> edit-user-api
