const mongoose = require('mongoose')
const Schema = mongoose.Schema


const appointmentSchema = new Schema({
    startTime : {
        type : Date
    },
    endTime : {
        type : Date
    },
    doctorId : {
        type : Schema.Types.ObjectId
    },
    patientId : {
        type : Schema.Types.ObjectId
    },
    status :{
        type : String,
        enum : ["accept", "decline", "pending"],
        default : "pending"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})


const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;


