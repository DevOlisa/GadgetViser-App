const mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Define the user schema
let UserSchema = new Schema({
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'please enter a valid email address'],
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        validate: [function (password) {
            return password.length >= 8;
        }, 'password must be at least 8 characters'],
        required: true
    },
    salt: {
        type: String
    },
    level: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    provider: {
        type: String
    },
    providerId: {
        type: String
    },
    providerData: {},
    created: {
        type: String,
        default: Date.now
    }
});

//********  Instance Methods **********//

UserSchema.methods.authenticate = function (password) {
    return this.password === password;
};

//********  Middleware functions**********//
// Pre Save Middleware
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// Create hash of password
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

// Authenticate if password is correct
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

// Find Possible Username
UserSchema.statics.findUniqueUsername = function (username, suffix,
    callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) +
                    (Math.random() * 1000), callback);
            }
        } else {
            callback(null);
        }
    });
};


// Find Possible Username
UserSchema.statics.findUniqueEmail = function (username, suffix,
    callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) +
                    (Math.random() * 1000), callback);
            }
        } else {
            callback(null);
        }
    });
};


// Post Save Middleware
UserSchema.post('save', function (next) {
    if (this.isNew) {
        console.log('A new user was created');
    } else {
        console.log('A user info was updated');
    }
});

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Register Model
mongoose.model('User', UserSchema);
