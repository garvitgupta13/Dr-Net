const Joi = require('joi')

// const schema = Joi.object({
//     name: Joi.string().min(2).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required().strict(),
//     confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
//     patientInfo: Joi.array().items(
//         Joi.object({
//             age: Joi.number().min(2).max(100),
//             height: Joi.number().integer(),
//             weight: Joi.number().integer(),
//             bloodType: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
//             education: Joi.string().allow(''),
//             diseaseDescription: Joi.string().empty('').allow(null),
//             medicalHistory: Joi.array().items(
//                 Joi.object({
//                     prescription: Joi.string(),
//                     recommendedTests: Joi.string().empty('').allow(null)
//                 })
//             )
//         })
//     ),
//     doctorInfo: Joi.array().items(
//         Joi.object({
//             domain: Joi.string(),
//             yearsOfExperience: Joi.number().integer(),
//             education: Joi.string().allow(''),
//             timeSlot: Joi.array().items({
//                 startTime: Joi.date(),
//                 endTime: Joi.date()
//             }),
//             documentImage: Joi.string()
//         })
//     )
// })


function validateSignUp(data) {

    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required().strict(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
        age: Joi.number().min(2).max(100),
        height: Joi.number().integer(),
        weight: Joi.number().integer(),
        bloodType: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
        education: Joi.string().allow(''),
        diseaseDescription: Joi.string().empty('').allow(null),
        prescription: Joi.string(),
        recommendedTests: Joi.string().empty('').allow(null),
        domain: Joi.string(),
        yearsOfExperience: Joi.number().integer(),
        education: Joi.string().allow(''),
        bio: Joi.string().allow(''),
        startTime: Joi.string(),
        endTime: Joi.string(),
        documentImage: Joi.string(),
        fees: Joi.number(),
        status: Joi.boolean()
    })
    const { error, value } = schema.validate(data);
    return error;
}

// const validateSignUp = (data) => schema.validate(data)


const validateSignIn = (data) => {
    const signInSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    const { error, value } = signInSchema.validate(data);
    return error;
};


module.exports = { validateSignUp, validateSignIn }