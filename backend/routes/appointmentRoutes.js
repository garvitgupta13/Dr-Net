const router = require("express").Router();
const Appointment = require('../models/appointment')
const { bookAnAppointment } = require('../controllers/appointmentController')
const authVerify = require('../middleware/authVerify')
//! Client side routes for Appointment

// book an appointment with doctor ( id = doctorId )
router.post("/:id/book", authVerify , bookAnAppointment)



  



module.exports = router;