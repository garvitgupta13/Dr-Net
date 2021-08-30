const Conversation = require('../models/Conversations');
const Message = require('../models/Message');
const _ = require('lodash');

const addMessage = async (req, res) => {
  try {
    let message = req.body;
    message.senderId = req.user._id;
    message.conversationId = req.params.conversationId;

    let { canChat, patient, doctor } = await Conversation.findById(req.params.conversationId);

    if (!canChat || (!_.isEqual(patient._id, req.user._id) && !_.isEqual(doctor._id, req.user._id))) {
      return res.status(401).send('ACCESS DENIED');
    }

    let newMessage = new Message(message);
    await newMessage.save();

    return res.send(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const getMessages = async (req, res) => {
  try {
    const { patient, doctor } = await Conversation.findById(req.params.conversationId);
    if (!_.isEqual(patient._id, req.user._id) && !_.isEqual(doctor._id, req.user._id)) {
      return res.send({
        status: 401,
        message: 'ACESS DENIED',
      });
    }
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  addMessage,
  getMessages,
};
