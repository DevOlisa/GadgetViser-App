const config = require('./config'),
    mongoose = require('mongoose');

module.exports = () => {
    const db = mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

    require('../app/models/user.server.model');
    require('../app/models/article.server.model');
    require('../app/models/question.server.model');
    require('../app/models/gadget.server.model');
    require('../app/models/answer.server.model');
    require('../app/models/gadget-specs/phone-spec-schema/phone.display.model');
    require('../app/models/gadget-specs/phone-spec-schema/phone.memory.model');
    require('../app/models/gadget-specs/phone-spec-schema/phone.camera.model');
    require('../app/models/gadget-specs/phone-spec-schema/phone.audio.model');
    require('../app/models/gadget-specs/phone-spec-schema/phone.performance.model');
    require('../app/models/gadget-specs/phone-spec-schema/phone.software.model');
    require('../app/models/gadget-specs/phone-spec-schema/phone.power.model');
    return db;
};