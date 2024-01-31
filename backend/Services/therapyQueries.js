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

module.exports = fetchTherapyWithId;
