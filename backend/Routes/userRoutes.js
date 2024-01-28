const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    // get request by admin to view all users
});

router.post("/:id", (req, res) => {
    // get request by user to view his profile
})




module.exports = router