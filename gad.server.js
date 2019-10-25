process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

const db = mongoose();
const gad = express();
var passport = passport();
gad.listen(3000);
module.exports = gad;
console.log('Server running at http://localhost:3000/');
