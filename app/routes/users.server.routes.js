const users = require('../controllers/users.server.controller'),
passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);

    app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    app.get('/oauth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
    }));

    app.get('/oauth/google/signin', passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    app.get('/signout', users.signout);

    app.route('/users')
    .post(users.create)
    .get(users.list);

    app.route('/users/:userId')
    .get(users.read);

    app.param('userId', users.fetchUser)
}