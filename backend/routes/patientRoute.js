const router = require("express").Router();
const { getPatients, getPatient, updatePatient } = require("../controllers/patientController");
const authVerify = require('../middleware/authVerify');
const isPatient = require("../middleware/isPatient");

//! Get all patients
// router.get('/', authVerify, getPatients);
router.get('/', getPatients);
//! Get a patient
router.get('/:id', authVerify, getPatient);

//! Update a patient
router.put('/:id', authVerify, isPatient, updatePatient);

module.exports = router;
