const router = require("express").Router();
const { getDoctors, getDoctor, updateDoctor } = require("../controllers/doctorController");

//! Get all doctor
router.get('/', getDoctors);

//! Get a doctor
router.get('/:id', getDoctor);

//! Update a doctor
router.put('/:id', updateDoctor);

module.exports = router;
