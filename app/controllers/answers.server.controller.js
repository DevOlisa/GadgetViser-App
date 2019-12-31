const Answer = require('mongoose').model('Answer');
const Question = require('mongoose').model('Question');

exports.updateQuestion = (req, res, next) => {
    if (req.body.update === true) {
        console.log(req.body);
        console.log('That was the answer');
        next();
    }
    let answer = new Answer(req.body);
    console.log(req.body);
    console.log(answer);
    console.log('That was the answer');
    Question.findOneAndUpdate({
        _id: req.body.question_id},
        {
            $push: {
                answers : answer}
        }, {
            useFindAndModify: false
        }, function(err, data) {
            if (err) {  
                next(err);
            } else {
                answer.save((err)=> {
                    if (err) {
                        console.log('There was an error saving reply');
                        console.error(`${err.message}`);
                    } else {
                        res.json({data});
                    }
                })
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
