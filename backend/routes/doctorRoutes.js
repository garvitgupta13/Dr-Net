const router = require("express").Router();
const authVerify = require('../middleware/authVerify')
const { getDoctors, getDoctor, updateDoctor, addReview, addConsultation } = require("../controllers/doctorController");

//! Get all doctor
router.get('/',authVerify, getDoctors);

//! Get a doctor
router.get('/:id', authVerify, getDoctor);

//! Update a doctor
router.put('/:id', authVerify, updateDoctor);

//! Add review
router.post('/review/:id', addReview);

//!Add consultation
router.put('/consultation/:doctorId/:patientId', addConsultation);
module.exports = router;
