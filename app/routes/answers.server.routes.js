const answers = require('../controllers/answers.server.controller');

module.exports = (app) => {
    app.route('/answers')
        .get(answers.list)
        .post(answers.updateQuestion);
};