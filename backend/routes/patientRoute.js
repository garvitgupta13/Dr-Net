const router = require("express").Router();
const { getPatients, getPatient, updatePatient } = require("../controllers/patientController");
const authVerify = require('../middleware/authVerify')

//! Get all patients
router.get('/', authVerify, getPatients);

//! Get a patient
router.get('/:id', authVerify, getPatient);

//! Update a patient
router.put('/:id', authVerify, updatePatient);

module.exports = router;
