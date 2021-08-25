const router = require('express').Router();
const authVerify = require('../middleware/authVerify');
const { addConversation, getConversations, endConversation } = require('../controllers/conversationController');
const isDoctor = require('../middleware/isDoctor');

//Get all the conversation of logged in user
router.get('/', authVerify, getConversations);

//Add a conversation between the logged in user and doctor
router.post('/:doctorId', authVerify, addConversation);

//End the conversation
router.put('/:id', authVerify, isDoctor, endConversation);

module.exports = router;
