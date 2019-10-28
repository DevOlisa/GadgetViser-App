const config = require('./config'),
 express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session =require('express-session'),
flash = require('connect-flash'),
passport =require('passport');

module.exports = function() {
    const gad = express();

    if (process.env.NODE_ENV === 'development') {
        gad.use(morgan('short'));
    } else if (process.env.NODE_ENV === 'production') {
        gad.use(compress());
    }

    gad.use(bodyParser.urlencoded({
        extended: true
    }));
    gad.use(bodyParser.json());
    gad.use(methodOverride());

    // configure Session
    gad.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    //Set EJS as the default templating engine
    gad.set('views', './app/views');
    gad.set('view engine', 'ejs');

    // Enable CORS
    // gad.use(require('cors')());

    // Set Flash Module
    gad.use(flash());
    // Set passport sessions
    gad.use(passport.initialize());
    gad.use(passport.session());

    require('../app/routes/index.server.routes.js')(gad);
    require('../app/routes/articles.server.routes.js')(gad);
    require('../app/routes/users.server.routes.js')(gad);
    require('../app/routes/gadgets.server.routes.js')(gad);
    require('../app/routes/questions.server.routes.js')(gad);
    require('../app/routes/answers.server.routes.js')(gad);
    require('../app/routes/search.server.routes.js')(gad);


    // Use the Express static to serve files
    gad.use(express.static('./public'));
    // express.static('/public', {})

    return gad;
}