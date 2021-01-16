const router = require("express").Router()
const { Patient } = require("../models")

router.get('/patients', async (req, res) => {
    
    const patients = await Patient.findAll();
    res.status(200).json(patients);

    
})



module.exports = router;