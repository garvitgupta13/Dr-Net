const router = require("express").Router();
const { getDoctors, getDoctor, updateDoctor, addReview } = require("../controllers/doctorController");
const authVerify = require('../middleware/authVerify')


//! Get all doctor
router.get('/',authVerify, getDoctors);

//! Get a doctor
router.get('/:id', authVerify, getDoctor);

//! Update a doctor
router.put('/:id', authVerify, updateDoctor);

router.post('/review/:id',authVerify, addReview);

module.exports = router;
