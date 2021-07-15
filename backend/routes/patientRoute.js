const router = require("express").Router();
const { getPatients, getPatient, updatePatient } = require("../controllers/patientController");

//! Get all patients
router.get('/', getPatients);

//! Get a patient
router.get('/:id', getPatient);

//! Update a patient
router.put('/:id', updatePatient);

module.exports = router;
