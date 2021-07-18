const User = require("../models/Users");
const Doctor = require("../models/Doctors");
const Patient = require("../models/Patients");

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
        //If anyone else try to update the details then block him
        if (req.user._id != req.params.id)
            return res.status(403).send("ACESS DENIED!!");

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
            doctor.doctorInfo,
            {
                yearsOfExperience: req.body.yearsOfExperience,
                domain: req.body.domain,
                education: req.body.education,
                bio: req.body.bio,
                fees: req.body.fees,
                status: req.body.status
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

const addReview = async (req, res) => {
    try {
        let doctor = await User.findById(req.params.id);
        if (!doctor) return res.send(404).send("Doctor not found");
        //Get the doctor
        doctor = await Doctor.findById(doctor.doctorInfo);
        //Add the review in array
        let reviews = [...doctor.reviews, req.body];
        //Update the reviews array
        const doctorInfo = await Doctor.findByIdAndUpdate(doctor._id, { reviews }, { new: true });
        res.status(200).send(doctorInfo);
    }
    catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}


const addConsultation = async (req, res) => {
    try {
        //If anyone else try to update the details then block him
        if (req.user._id != req.params.doctorId)
            return res.status(403).send("ACESS DENIED!!");

        let patient = await User.findById(req.params.patientId);
        if (!patient) return res.send(404).send("Patient not found");

        req.body.doctorId = req.params.doctorId;

        patient = await Patient.findById(patient.patientInfo);
        let medicalHistory = [...patient.medicalHistory, req.body];

        const patientInfo = await Patient.findByIdAndUpdate(patient._id, { medicalHistory }, { new: true });
        return res.status(200).send(patientInfo);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}

module.exports = {
    getDoctors,
    getDoctor,
    updateDoctor,
    addReview,
    addConsultation
};
