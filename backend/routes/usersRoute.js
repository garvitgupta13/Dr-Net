const router = require('express').Router();


const {
    userSignUp,
    userSignIn,
    getAllPatients
} = require('../controllers/usersController')


//! Sign Up for patient
router.post('/patient/signup', async (req, res) => {
    await userSignUp(req.body, "patient", res)
})

//! Sign Up for doctors
router.post('/doctor/signup', async (req, res) => {
    await userSignUp(req.body, "doctor", res)
}) 

//! Sign In for patient
router.post('/patient/signin', async(req, res) => {
    await userSignIn(req.body, "patient", res)
})

//! Sign In for doctor
router.post('/doctor/signin', async(req, res) => {
    await userSignIn(req.body, "patient", res)
})

//! Get all patients
// router.get('/patients', async (req, res) => {
//     await getAllPatients(req.body, res)
// })


module.exports = router



