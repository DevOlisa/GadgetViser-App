const passport = require('passport'),
    url = require('url'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callback: config.google.callback,
        passReqToCallback: true
    },
        (req, accessToken, refreshToken, profile, done) => {
            let providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            let providerUserProfile = {
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'google',
                providerId: profile.id,
                providerData: providerData
            };

            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};