const Joi = require('joi')
const Appointment = require('../models/appointment')
const Doctor = require("../models/Doctors");
const moment = require('moment')

const schema = Joi.object({
    startTime: Joi.date().min('now').required(),
    endTime: Joi.date().min('now').required(),
});


const validateAppointment = async (req, appointment, res) => {
    const joiValidation = (params) => {
        return schema.validate(params)
    }

    const { error } = joiValidation(appointment)

    if (error) {
        throw new Error(error.details[0].message);
    }

    const startTime = moment(appointment.startTime)
    const endTime = moment(appointment.endTime)
    const timeDiff = moment.duration(endTime.diff(startTime)).asMinutes();

    if (!(timeDiff === 30 || timeDiff === 60)) {
        throw new Error('invalid time range');
    }

    const doctorDetail = await Doctor.findOne({ _id: req.params.id })
    
    if (!doctorDetail) {
        throw new Error('doctor not found');
    }

    const doctorStartTime = moment(doctorDetail.startTime)
    const doctorEndTime = moment(doctorDetail.endTime)

    if(startTime.isBefore(doctorStartTime) || endTime.isAfter(doctorEndTime)) {
        return res.status(400).json({
            message: 'doctor not available at this time'
        })
    }

    const allAppointments = await Appointment.find({ doctorId: req.params.id })

    allAppointments.forEach((appointment) => {
        if (
            startTime.isBetween(appointment.startTime, appointment.endTime) ||
            endTime.isBetween(appointment.startTime, appointment.endTime) ||
            startTime.isSame(appointment.startTime) ||
            endTime.isSame(appointment.endTime) ||
            startTime.isSame(appointment.endTime) ||
            endTime.isSame(appointment.startTime)
        ){
            return res.status(400).json({
                message: 'this time is not available'
            })
        }
    })

    return { startTime, endTime }

}

exports.validateAppointment = validateAppointment
