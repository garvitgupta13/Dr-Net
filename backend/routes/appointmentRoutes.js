const router = require("express").Router();
const Appointment = require('../models/appointment')
const { 
    bookAnAppointment, 
    getAllAppointments, 
    acceptAppointment, 
    declineAppointment 
} = require('../controllers/appointmentController')
const authVerify = require('../middleware/authVerify')

//! patient side routes for Appointment

// book an appointment with doctor ( id = doctorId )
router.post("/:id/book", authVerify, bookAnAppointment)



//! common routes for Appointment
//get all appointments for a doctor or patient
router.get("/", authVerify, getAllAppointments)




//! doctor side routes for Appointment

// Accept a appointment request from patient
router.patch("/:id/accept", authVerify, acceptAppointment)

// Decline a appointment request from patient
router.patch("/:id/decline", authVerify, declineAppointment)

module.exports = router;