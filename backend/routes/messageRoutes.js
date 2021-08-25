const router = require('express').Router();
const authVerify = require('../middleware/authVerify');
const { addMessage, getMessages } = require('../controllers/messageController');

//Add a message to conversation
router.post('/:conversationId', authVerify, addMessage);

//Get messages of a conversation
router.get('/:conversationId', authVerify, getMessages);

module.exports = router;
