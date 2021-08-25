const Conversation = require('../models/Conversations');
const Message = require('../models/Message');

const addMessage = async (req, res) => {
  try {
    let message = req.body;
    message.senderId = req.user._id;
    message.conversationId = req.params.conversationId;

    let conversation = await Conversation.findById(req.params.conversationId);

    if (!conversation.canChat || !conversation.recipients.includes(req.user._id)) {
      return res.send({
        status: 500,
        message: "ACESS DENIED"
      })
    }

    let newMessage = new Message(message);
    await newMessage.save();
    return res.send(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation.recipients.includes(req.user._id)) {
      return res.send({
        status: 500,
        message: "ACESS DENIED"
      })
    }
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addMessage,
  getMessages,
};
