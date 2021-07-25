const Patient = require("../models/Patients");
const User = require("../models/Users");

const updatePatient = async (req, res) => {
  try {
    //If anyone else try to update the details then block him
    if (req.user._id != req.params.id)
      return res.status(403).send("ACESS DENIED!!");

    //update the patient's name
    const patient = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    //If no such patient exists then return 404
    if (!patient) {
      return res.send(404).send("Patient not found");
    }
    //Update the patientInfo
    const patientInfo = await Patient.findByIdAndUpdate(
      patient.patientInfo,
      {
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        bloodType: req.body.bloodType,
        education: req.body.education,
        diseaseDescription: req.body.diseaseDescription
      },
      { new: true }
    );
    res.status(200).send("Patient's details updated");
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const getPatient = async (req, res) => {
  //TODO: Only logged in uses can see his profile only
  try {
    const patient = await User.findById(req.params.id)
      .select("-doctorInfo -password -_v")
      .populate("patientInfo");

    if (!patient) {
      return res.send(404).send("Patient not found");
    }

    return res.status(200).json({
      status: "success",
      data: patient
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" })
      .select("-doctorInfo -password -_v")
      .populate("patientInfo");

    return res.status(200).json({
      status: "success",
      data: patients
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

module.exports = {
  getPatients,
  getPatient,
  updatePatient
};
