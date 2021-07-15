const User = require("../models/Users");
const Doctor = require("../models/Doctors");

const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" })
            .select("-patientInfo -password -_v")
            .populate("doctorInfo");

        return res.status(200).json({
            status: "success",
            data: doctors
        });
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

const getDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id)
            .select("-patientInfo -password -_v")
            .populate("doctorInfo");

        if (!doctor) {
            return res.send(404).send("Doctor not found");
        }

        return res.status(200).json({
            status: "success",
            data: doctor
        });
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

const updateDoctor = async (req, res) => {
    try {
        //update the doctor's name
        const doctor = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        //If no such doctor exists then return 404
        if (!doctor) {
            return res.send(404).send("Doctor not found");
        }
        //Update the doctorinfo
        const doctorInfo = await Doctor.findByIdAndUpdate(
            doctor.patientInfo,
            {
                yearsOfExperience: req.body.yearsOfExperience,
                domain: req.body.domain,
                education: req.body.education,
                bio: req.body.bio
                // timeSlot: req.body.timeSlot
            },
            { new: true }
        );
        res.status(200).send("Doctor's details updated");
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
};

module.exports = {
    getDoctors,
    getDoctor,
    updateDoctor
};
