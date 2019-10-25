const config = require('./config'),
    mongoose = require('mongoose');

module.exports = () => {
    const db = mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

    require('../app/models/user.server.model');
    require('../app/models/article.server.model');
    require('../app/models/question.server.model');
    require('../app/models/gadget.server.model');
    require('../app/models/answer.server.model');
    return db;
};