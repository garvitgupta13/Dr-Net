const User = require('../models/Users');
const Patient = require('../models/Patients');
const Doctor = require('../models/Doctors');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
require('dotenv').config();

const { validateSignUp, validateSignIn } = require('../validation/usersValidation');

const userSignUp = async (userDetails, role, res) => {
  try {
    const userError = validateSignUp(userDetails);

    if (userError) {
      return res.status(400).send(userError.details[0].message);
    }

    // check if the email is present in the DB or not
    const emailNotTaken = checkEmail(userDetails.email);

    if (!emailNotTaken) {
      return res.json({
        status: 401,
        success: 'false',
        message: `Email is already Registered. Try to Login`,
      });
    }

    // check if confirm password is same as password
    if (!userDetails.confirmPassword === userDetails.password) {
      return res.status(404).send('confirmed password is incorrect');
    }

    // all coming from req.body
    const { name, email, password } = userDetails;

    // hash the password
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    let user;
    if (role === 'patient') {
      user = new User({
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      });

      const patientInformation = new Patient({
        age: userDetails.age,
        height: userDetails.height,
        weight: userDetails.weight,
        bloodType: userDetails.bloodType,
        education: userDetails.education,
        diseaseDescription: userDetails.diseaseDescription,
        //! remember to add here after patient model is created
      });

      user.patientInfo = patientInformation;
      await patientInformation.save();

      // remove the unwanted material from the document
      delete user.doctorInfo;
    } else if (role === 'doctor') {
      user = new User({
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      });

      const doctorInformation = new Doctor({
        domain: userDetails.domain,
        yearsOfExperience: userDetails.yearsOfExperience,
        education: userDetails.education,
        bio: userDetails.bio,
        fees: userDetails.fees,
        status: userDetails.status,
        startTime: userDetails.startTime,
        endTime: userDetails.endTime,
        bio: userDetails.bio,
        documentImage: userDetails.documentImage,
        //! remember to add here after doctor model is created
      });

      user.doctorInfo = doctorInformation;
      await doctorInformation.save();

      // remove the unwanted material from the document
      delete user.patientInfo;
    }

    await user.save();

    const token = jwtGenerator(user);

    return res.status(201).json({
      status: 'success',
      data: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const userSignIn = async (userDetails, role, res) => {
  try {
    //TODO : Validate req body

    // Check if email and password are correct or not

    const signInError = validateSignIn(userDetails);
    if (signInError) return res.status(400).send(signInError.details[0].message);

    const { email, password } = userDetails;

    let user;
    if (role === 'patient') {
      user = await User.findOne({ email }).select('-doctorInfo').populate('patientInfo');
    } else if (role === 'doctor') {
      user = await User.findOne({ email }).select('-patientInfo').populate('doctorInfo');
    }

    if (!user) {
      return res.json({
        status: 400,
        message: 'Incorrect email',
      });
      // throw new Error('email or password is incorrect')
    }

    if (user.role !== role) {
      return res.json({
        message: 'Please make sure you are logging in from the right portal.',
        status: 403,
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) return res.json({ status: 400, message: 'Password is incorrect' });

    const token = jwtGenerator(user);

    //TODO: Remove password from return object
    // delete user["password"];//not working

    return res.json({
      status: 200,
      token: token,
      message: 'Login Successful',
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err });
  }
};

const checkEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = {
  userSignUp,
  userSignIn,
};
