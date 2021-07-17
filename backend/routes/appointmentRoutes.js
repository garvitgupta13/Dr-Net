const router = require("express").Router();
const Appointment = require('../models/appointment')
const { bookAnAppointment, getAllAppointments } = require('../controllers/appointmentController')
const authVerify = require('../middleware/authVerify')

//! patient side routes for Appointment

// book an appointment with doctor ( id = doctorId )
router.post("/:id/book", authVerify , bookAnAppointment)



//! common routes for Appointment
//get all appointments for a doctor or patient
router.get("/", authVerify , getAllAppointments)




//! doctor side routes for Appointment



module.exports = router;