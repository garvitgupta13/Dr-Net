const router = require("express").Router();
const authVerify = require('../middleware/authVerify')
const { getDoctors, getDoctor, updateDoctor, addReview, addConsultation } = require("../controllers/doctorController");
const isDoctor = require("../middleware/isDoctor");

//! Get all doctor
router.get('/', getDoctors);

//! Get a doctor
router.get('/:id', getDoctor);

//! Update a doctor
router.put('/:id', authVerify, isDoctor, updateDoctor);

//! Add review
router.post('/review/:id', addReview);

//!Add consultation
router.put('/consultation/:doctorId/:patientId', authVerify, isDoctor, addConsultation);
module.exports = router;
