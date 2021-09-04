const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 31556926 });
}

module.exports = jwtGenerator;
