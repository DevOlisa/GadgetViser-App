process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    path = require('path'),
    passportConfig = require('./config/passport');

const db = mongoose();
const gad = express();
const passport = passportConfig();

gad.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

gad.listen(3000);
module.exports = gad;
console.log('Server running at http://localhost:3000/');
