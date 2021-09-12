const Express = require('express');
const usersRoute = require('../routes/usersRoute');
const patientRoute = require('../routes/patientRoute');
const doctorRoute = require('../routes/doctorRoutes');
const paymentRoute = require('../routes/paymentRoutes');
const conversationRoute = require('../routes/conversationRoutes');
const messageRoutes = require('../routes/messageRoutes');

module.exports = function (app) {
  app.use(Express.json());

  app.use('/api/users', usersRoute);
  app.use('/api/patient', patientRoute);
  app.use('/api/doctor', doctorRoute);
  app.use('/api/payment', paymentRoute);
  app.use('/api/conversation', conversationRoute);
  app.use('/api/messages', messageRoutes);
};
