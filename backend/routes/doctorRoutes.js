const router = require("express").Router();
<<<<<<< HEAD
const { getDoctors, getDoctor, updateDoctor, addReview } = require("../controllers/doctorController");
const authVerify = require('../middleware/authVerify')

=======
const { getDoctors, getDoctor, updateDoctor, addReview, addConsultation } = require("../controllers/doctorController");
>>>>>>> f7345c8d8ff57facccbe26ef9b42f3d361469b99

//! Get all doctor
router.get('/',authVerify, getDoctors);

//! Get a doctor
router.get('/:id', authVerify, getDoctor);

//! Update a doctor
router.put('/:id', authVerify, updateDoctor);

<<<<<<< HEAD
router.post('/review/:id',authVerify, addReview);
=======
//! Add review
router.post('/review/:id', addReview);
>>>>>>> f7345c8d8ff57facccbe26ef9b42f3d361469b99

//!Add consultation
router.put('/consultation/:doctorId/:patientId', addConsultation);
module.exports = router;
