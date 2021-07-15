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
    },
    review : [
        {
            _id : {
                type : Schema.Types.ObjectId,
                index : true,
                auto : true
            },
            reviewerId : {
                type : Schema.Types.ObjectId,
                ref : 'Patient'
            },
            body : {
                type : String
            },
            rating : {
                type : Number,
                min : 1,
                max : 5
            }
        },{ timestamps : true }
    ]
},{ timestamps : true})


const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor


