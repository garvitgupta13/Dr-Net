const router = require("express").Router();
const { getDoctors, getDoctor, updateDoctor, addReview, addConsultation } = require("../controllers/doctorController");

//! Get all doctor
router.get('/', getDoctors);

//! Get a doctor
router.get('/:id', getDoctor);

//! Update a doctor
router.put('/:id', updateDoctor);

//! Add review
router.post('/review/:id', addReview);

//!Add consultation
router.put('/consultation/:doctorId/:patientId', addConsultation);
module.exports = router;
