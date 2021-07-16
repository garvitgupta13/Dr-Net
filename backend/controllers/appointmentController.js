const Appointment = require('../models/appointment')
const User = require('../models/Users')
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

        const { startTime, endTime } = await validateAppointment(req, req.body)

        const patientId = await User.findById(req.user.id)
            .select("patientInfo -_id")
            .populate('patientInfo', '_id')

        const newAppointment = new Appointment({
            startTime,
            endTime,
            doctorId: req.params.id,
            patientId : patientId.patientInfo._id
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


module.exports = { bookAnAppointment }