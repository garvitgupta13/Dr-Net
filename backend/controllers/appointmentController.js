const mongoose = require('mongoose');
const Appointment = require('../models/appointment')
const User = require('../models/Users')
const Doctor = require('../models/Doctors')
const { validateAppointment } = require('../validation/appointmentValidation')

const bookAnAppointment = async (req, res) => {
    try {

        // check patient

        const role = req.user.role
        if (role === "doctor") {
            res.status(400).json({
                status: "failed",
                message: "Invalid Action"
            })
        }

        const { startTime, endTime } = await validateAppointment(req, req.body, res)

        const patientIdUnsanitized = await User.findById(req.user.id)
            .select("patientInfo -_id")
            .populate('patientInfo', '_id')


        // const doctorId = mongoose.Types.ObjectId(req.params.id)
        const patientId = patientIdUnsanitized.patientInfo._id

        const newAppointment = new Appointment({
            startTime,
            endTime,
            doctorId: req.params.id,
            patientId: patientId
        })


        await newAppointment.save();

        res.status(200).json({
            status: "success",
            data: newAppointment
        })

    } catch (err) {
        console.log(err.message)
        res.status(400).send(err)
    }
}

const getAllAppointments = async (req, res) => {
    try {
        // Check the role of the user

        // if role is doctor send all appointments with the patient information
        // if role is patient send all appointments with doctor information

        const role = req.user.role
        let appointments
        const { id } = req.user

        if (role === "doctor") {
            let doctorIdUnsanitized = await User.findById(id)
                .select("doctorInfo -_id")
                .populate('doctorInfo', '_id')
            // console.log(doctorIdUnsanitized)
            appointments = await Appointment.find({ doctorId: doctorIdUnsanitized.doctorInfo._id })
                .select("-doctorId")
                .populate('patientId')
        } else if (role === "patient") {
            let patientIdUnsanitized = await User.findById(id)
                .select("patientInfo -_id")
                .populate('patientInfo', '_id')
            // console.log(patientIdUnsanitized)
            appointments = await Appointment.find({ patientId: patientIdUnsanitized.patientInfo._id })
                .select("-patientId")
                .populate('doctorId', { reviews: 0 })
        }

        if (appointments.length > 0) {
            res.status(200).json({
                status: "success",
                data: appointments
            })
        } else {
            res.status(404).send({ error: 'no appointment found' });
        }


    } catch (err) {
        console.log(err.message)
        res.status(400).send(err)
    }

}

const acceptAppointment = async (req, res) => {
    try {
        // Check the role of the user
        const role = req.user.role
        if (role === "patient") {
            res.status(400).json({
                status: "failed",
                message: "Invalid Action"
            })
        }

        // Check if the appointment is present or not
        const { id } = req.params // get appointment id

        const appointment = await Appointment.findById(id)
        if (appointment === null) {
            res.status(404).json({
                status: "failed",
                message: "Appointment not found"
            })
        }

        // Check if the appointment is already accepted
        if (appointment.status === 'decline') {
            res.status(400).json({
                status: "failed",
                message: "Appointment booking no longer available"
            })
        }

        appointment.status = 'accept'

        await appointment.save()

        res.status(200).json({
            status: "success",
            data: appointment
        })


    } catch (err) {
        console.log(err.message)
        res.status(400).send(err)
    }
}


const declineAppointment = async (req, res) => {
    try {
        // Check the role of the user
        const role = req.user.role
        if (role === "patient") {
            res.status(400).json({
                status: "failed",
                message: "Invalid Action"
            })
        }

        // Check if the appointment is present or not
        const { id } = req.params // get appointment id
        const appointment = await Appointment.findById(id)
        if (appointment === null) {
            res.status(404).json({
                status: "failed",
                message: "Appointment not found"
            })
        }
        // Check if the appointment is already accepted
        if (appointment.status === 'accept') {
            res.status(400).json({
                status: "failed",
                message: "Appointment booking no longer available"
            })
        }
        appointment.status = 'decline'
        await appointment.save()
        res.status(200).json({
            status: "success",
            data: appointment
        })
        

    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
}

module.exports = {
    bookAnAppointment, 
    getAllAppointments, 
    acceptAppointment, 
    declineAppointment 
}