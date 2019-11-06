const Answer = require('mongoose').model('Answer');

exports.create = (req, res, next) => {
    let answer = new Answer(req.body);

    answer.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.json(answer);
        }
    });
};

exports.list =function (req, res, next) {
    Answer.find({}, function(err, answers) {
        if (err) {
            return next(err);
        } else {
            res.json(answers);
        }
    }).populate('question');
};
