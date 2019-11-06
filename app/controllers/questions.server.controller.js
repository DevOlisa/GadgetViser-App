const Question = require('mongoose').model('Question');

exports.list = (req, res, next) => {
    if (req.query) {
    console.log('Passing on Request');
        next();
    } else {
        Question.find({}, function (err, questions) {
            if (err) {
                return next(err);
            } else {
                res.json(questions);
            }
        });
    }
};

exports.getGadgetQuestions = (req, res, next) => {
    console.log('Handling Get Gadget Questions Request');
    console.log(req.user);
    Question.find({
        gadget: req.query.gadget
    }, "", {}).populate('answer').exec((err, questions)=> {
        if (err) {
            next(err);
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
