const User = require('mongoose').model('User');
const passport = require('passport');


let getErrorMessage = (err) => {
    let message = "";

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exist';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
};

exports.alert = (req, res) => {
    res.json(req.user);
}

exports.renderSignin = (req, res, next) => {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = (req, res, next) => {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = (req, res, next) => {
    if (!req.user) {
        let user = new User(req.body),
            message = null;

        user.provider = 'local';

        user.save(function (err) {
            console.log('tried to save');
            if (err) {
                console.log('but got an error');
                console.log(err);
                message = getErrorMessage(err);
                req.flash('error', message);

                return res.redirect('/signup')
            }
            req.login(user, function (err) {
                console.log(req.user);
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

//Sign in with OAuth Providers
exports.saveOAuthUserProfile = (req, profile, done) => {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, (err, user)=> {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                let possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                
                User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                    profile.username = availableUsername;

                    user = new User(profile);

                    user.save(function(err) {
                        if (err) {
                            let message = _this.getErrorMessage(err);

                            req.flash('error', message);
                            return res.redirect('/signup');
                        } 
                    
                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};

// Sign out function
exports.signout = (req, res) => {
    console.log(req.user);
    req.logout();
    res.redirect('/');
}



//APIs Functons
exports.create = (req, res, next) => {
    let user = new User(req.body);

    user.save((err) => {
        if (err) {
            return next(err);
        } else {
            console.log(user);
            res.json(user);
        }
    });
};

exports.list = (req, res, next) => {
    User.find({}, "username email", function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = (req, res) => {
    res.json(req.user);
};

exports.fetchUser = (req, res, next, username) => {
    //Find a way to perform case-insensitive matches
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};