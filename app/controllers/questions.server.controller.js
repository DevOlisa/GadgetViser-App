const Question = require('mongoose').model('Question');

exports.list = (req, res, next) => {
    Question.find({}, function (err, questions) {
        if (err) {
            return next(err);
        } else {
            res.json(questions);
        }
    });
};

exports.create = (req, res, next) => {
    let question = new Question(req.body);

    question.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.json(question);
        }
    });
};
