const Conversation = require('../models/Conversations');

const addConversation = async (req, res) => {
  try {
    let patientId = req.user._id;
    let doctorId = req.params.doctorId;

    let conversationBetween = await Conversation.findOneAndUpdate(
      { recipients: [patientId, doctorId] },
      { $set: { canChat: true } },
      { new: true }
    );

    if (conversationBetween) {
      return res.status(200).send(conversationBetween);
    } else {
      let newConversation = new Conversation({
        recipients: [patientId, doctorId],
        canChat: true,
      });
      await newConversation.save();
      return res.status(200).send(newConversation);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const getConversations = async (req, res) => {
  try {
    let conversation = await Conversation.find({
      recipients: { $in: [req.user._id] },
    });
    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
};

const endConversation = async (req, res) => {
  try {
    let conversationId = req.params.id;

    let conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { $set: { canChat: false } },
      { new: true }
    );

    return res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addConversation,
  getConversations,
  endConversation,
};
