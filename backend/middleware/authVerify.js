const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const User = require('../models/Users')

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send('access denied');
        }

        const checkVerification = jwt.verify(token, process.env.JWT_SECRET_KEY);
        

        const user = await User.findOne({
            _id : checkVerification._id || checkVerification.id
        });

        // console.log(checkVerification._id);
        // console.log(user);

        req.token = token;
        req.user = user;
        next();

    } catch (err) {
        res.status(400).send('invalid token');
    }
};
