const express = require("express")
const router = express.Router()

router.post("/create", (req, res) => {
    // post request by user to create a new appointment
});

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

module.exports = router