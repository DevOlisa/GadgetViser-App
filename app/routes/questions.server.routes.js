const questions = require('../controllers/questions.server.controller');

module.exports = (app) => {
    app.route('/questions')
        .post(questions.create)
        .get(questions.list, questions.getGadgetQuestions);

        app.route('/questions/:questionID')
};