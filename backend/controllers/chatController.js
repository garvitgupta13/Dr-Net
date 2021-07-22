const mongoose = require('mongoose');
const User = require("../models/Users");
const Conversation = require("../models/Conversations");
const Patient = require('../models/Patients');


const addConversation = async (req, res) => {
    try {
        const { id } = req.params;  // doctor id

        // Check the logged in user is patient
        const role = req.user.role;

        if (role === 'doctor') {
            res.status(401).json({
                status: "failed",
                message: "You are not allowed to add a conversation with a doctor"
            });
        }

        // get patient id and name
        const patientIdUnsanitized = await User.findById(req.user.id)
            .select("patientInfo -_id")
            .populate('patientInfo', '_id')

        const patientName = req.user.name;
        let patientId = patientIdUnsanitized.patientInfo._id;
        let doctorId = id
        // Check if there is already a conversation with a doctor of id = id

        // If there is a conversation between the doctor and the patient
        const conversationBetween = await Conversation.findOne(
            {
                recipients: [patientId, doctorId]
            }
        )

        if (conversationBetween !== null) {
            return res.status(401).json({
                status: "failed",
                message: "You already have a conversation with this doctor"
            });
        }

        // If there is no conversation between the doctor and the patient
        // Create a new Blank conversation

        //TODO - Make this real time (Whenever a patient is added to a doctor's conversation list)
        // emit an event to the doctor's socket that the patient has joined his consultation panel 
        const patientInfo = await Patient.findById(patientId)

        const newConversation = new Conversation({
            recipients: [
                patientId,
                doctorId
            ],
            patientName : req.user.name,
            lastMessage: `My Self, ${patientName} I want to get consultation`,
            date: Date.now(),
        })

        await newConversation.save()

        // for testing purpose I am sending conversation
        //! remove afterward 
        res.status(200).json({
            status: "success",
            message: "Conversation added successfully",
            conversation: newConversation
        });


    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
}

/**
    @api {get} /conversations/ 
    Get all the conversations of the logged in doctor
**/

const viewPatients = async (req, res) => {
    try {
        // check the role of the user
        const role = req.user.role;

        if (role === 'patient') {
            res.status(401).json({
                status: "failed",
                message: "You are not allowed to view patients"
            });
        }

        // get the doctor id
        const doctorIdUnsanitized = await User.findById(req.user.id)
            .select("doctorInfo -_id")
            .populate('doctorInfo', '_id')

        let doctorId = doctorIdUnsanitized.doctorInfo._id;


        Conversation.aggregate([
            {
                $lookup: {
                    from: 'User',
                    localField: 'recipients',
                    foreignField: '_id',
                    as: 'recipientObj',
                },
            },
        ])
            .match({ recipients: { $all: [{ $elemMatch: { $eq: doctorId } }] } })
            .project({
                __v: 0,
                recipientObj: 0,
            })
            .exec((err, conversations) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json({
                        status: "success",
                        data: conversations
                    });
                }
            });
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
}


/**
    @api.route('/delete/:id')
    @api.param('id', 'patient id')
    Only a doctor can delete a patient
**/

const deletePatientConversation = async (req, res) => {
    try{
        const { id } = req.params; // patient id

        // Check the logged in user is patient
        const role = req.user.role;

        if (role === 'patient') {
            res.status(401).json({
                status: "failed",
                message: "You are not allowed to delete a conversation with a patient"
            });
        }

        // get doctor id
        const doctorIdUnsanitized = await User.findById(req.user.id)
            .select("doctorInfo -_id")
            .populate('doctorInfo', '_id')

        let doctorId = doctorIdUnsanitized.doctorInfo._id;
        let patientId = id;

        // get conversation id
        const conversationIdUnsanitized = await Conversation.findOne({
            recipients: [
                patientId, doctorId
            ]
        })

        const conversationId = conversationIdUnsanitized._id;

        // delete conversation
        await Conversation.findByIdAndRemove(conversationId);

        res.status(200).json({
            status: "success",
            message: "Conversation deleted successfully"
        });
    }catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
}

const postMessage = async (req, res) => {
    try {
        //TODO - Pending
    }catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
}


module.exports = {
    addConversation,
    viewPatients,
    deletePatientConversation,
    postMessage
}




