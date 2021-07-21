const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    converstion: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {   
        type: Date,
        default: Date.now
    },
})


const Message = mongoose.model('Message', MessageSchema)
module.exports = Message

