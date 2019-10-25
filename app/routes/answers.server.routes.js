const answers = require('../controllers/answers.server.controller');

module.exports = (app) => {
    app.route('/answer')
        .get(answers.list)
        .post(answers.create);
};