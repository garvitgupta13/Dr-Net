const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const PatientSchema = new Schema({
    age: {
        type: Number,
        required: false,
    },
    height: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    education: {
        type: String,
        required: false
    },
    diseaseDescription: {
        type: String,
        required: false
    },
    medicalHistory: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                index: true,
                auto: true
            },
            prescription: {
                type: String,
                minLength: 2,
                maxLength: 1000,
                trim: true
            },
            doctorId: {
                type: Schema.Types.ObjectId,
                ref: 'Doctor'
            },
            recommendedTests: {
                type: String,
                minLength: 0,
                maxLength: 1000,
                trim: true
            },
            disease: {
                type: String,
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
}, { timestamps: true })


const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient

