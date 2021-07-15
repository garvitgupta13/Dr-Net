const mongoose = require('mongoose');
const Schema = mongoose.Schema


const DoctorSchema = new Schema({
    domain : {
        type : String,
        required : false
    },
    yearsOfExperience : {
        type : Number,
        required : false
    },
    education : {
        type : String,
        required : false,
    },
    timeSlot : [
        {
            startTime : {
                type : Date,
                required : false
            },
            endTime : {
                type : Date,
                required : false
            }
        }
    ],
    documentImage : {
        type : String
    }
},{ timestamps : true})


const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor


