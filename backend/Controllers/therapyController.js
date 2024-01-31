const fetchTherapyWithId = require('../Services/therapyQueries');

async function fetchSingleTherapy(req,res) {

    const therapyId = req.params.id;
    const result = await fetchTherapyWithId(therapyId);

    if(result){
        res.status(200).send({success: true, therapy: result})
    }else{
        res.status(404).send({success: false, message: "Therapy not found"});
    }
}

module.exports = fetchSingleTherapy;
