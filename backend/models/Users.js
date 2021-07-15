const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'First Name Cannot be Blank'],
        minlength: 2,
        maxlength: 200,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email Cannot be blank'],
        minlength: 2,
        maxlength: 200,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password can not be blank'],
        minlength: 6,
        maxlength: 1024,
        trim: true,
    },
    role : {
        type : String,
        enum : ["admin", "patient", "doctor"]
    },
    patientInfo : {
        type: Schema.Types.ObjectId,
        ref : 'Patient'
    },
    doctorInfo :{
        type: Schema.Types.ObjectId,
        ref : 'Doctor',
    },
})



// Method to generate Authentication token....

UserSchema.methods.generateAuthToken = async () => {
    const user = this

    const payload = {
        id : user._id,
        name : user.name
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,  { expiresIn: 31556926 })

    return token
}



const User = mongoose.model('User', UserSchema);

module.exports = User



