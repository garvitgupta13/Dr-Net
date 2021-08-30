const Conversation = require('../models/Conversations');
const User = require('../models/Users');
const _ = require('lodash');
const { isEqual } = require('lodash');

const addConversation = async (req, res) => {
  try {
    let patientId = req.user._id;
    let doctorId = req.params.doctorId;
    let patient = await User.findById(patientId).select('name');
    let doctor = await User.findById(doctorId).select('name');

    let conversationBetween = await Conversation.findOneAndUpdate(
      { patient, doctor },
      { $set: { canChat: true } },
      { new: true }
    );

    if (conversationBetween) {
      return res.status(200).send(conversationBetween);
    } else {
      let newConversation = new Conversation({
        patient: patient,
        doctor: doctor,
        canChat: true,
      });
      await newConversation.save();
      return res.status(200).send(newConversation);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const getConversations = async (req, res) => {
  try {
    let role = req.user.role;
    let userId = req.user._id;
    let conversation;

    if (role === 'doctor') {
      conversation = await Conversation.find({ 'doctor._id': userId });
    }
    if (role === 'patient') {
      conversation = await Conversation.find({ 'patient._id': userId });
    }

    res.status(200).send(conversation);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const endConversation = async (req, res) => {
  try {
    let conversationId = req.params.id;
    let conversation = await Conversation.findById(conversationId);
    if (!isEqual(req.user._id, conversation.doctor._id)) {
      return res.status(401).send('ACCESS DENIED');
    }

    conversation.canChat = false;

    await conversation.save();

    return res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  addConversation,
  getConversations,
  endConversation,
};
