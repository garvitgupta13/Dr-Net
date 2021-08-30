const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name Cannot be Blank'],
    minlength: 2,
    maxlength: 200,
    trim: true,
  },
});

const ConversationSchema = new Schema(
  {
    patient: {
      type: UserSchema,
      required: [true, 'Patient is compulsary'],
    },
    doctor: {
      type: UserSchema,
      required: [true, 'Doctor is compulsary'],
    },
    canChat: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
