const mongoose = require('mongoose');
const Schema = mongoose.Schema


const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref : 'User' }],
    patientName : { type: String },
    lastMessage: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now()
    },
})


const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
