const Express = require('express');
const app = Express();
const morgan = require('morgan');
const cors = require('cors');

const bodyParser = require('body-parser');

//Connecting to DB
require('./startup/db')();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

//! Routes
require('./startup/routes')(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log('Listening on port', port, '...');
});

module.exports = server;
