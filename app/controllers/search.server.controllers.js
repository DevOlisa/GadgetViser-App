const Gadget = require('mongoose').model('Gadget');
const Article = require('mongoose').model('Article');
const Question = require('mongoose').model('Question');

exports.handleSearch = (req, res, next, string) => {
    req.result = {};
    req.errors = {};
    req.searchString = string.toLowerCase();
    console.log('Handling Search');
    next();
};

exports.gadgetSearch = (req, res, next) => {
    Gadget.find({
        link: { $regex : new RegExp(req.searchString, "i")}
    }, "name image", {}, (err, result) => {
        if (err) {
            req.error = err;
            req.result.gadgets = null;
            next();
        } else if(!result) {
            req.result.gadgets = null;
            next();
        } else if (result) {
            req.result.gadgets = result;
            next();
        }
    })
};

exports.articleSearch = (req, res, next) => {
    Article.find({
        title: { $regex : new RegExp(req.searchString, "i")}
    }, "title", (err, result) => {
        if (err) {
            req.error = err;
            req.result.articles = null;
            next();
        } else if(!result) {
            req.result.articles = null;
            next();
        } else if (result) {
            req.result.articles = result;
            next();
        }
    });
};

exports.questionSearch = (req, res, next) => {
    Question.find({
        title: req.searchString
    }, "title", (err, result) => {
        if (err) {
            req.error = err;
            req.result.questions = null;
            next();
        } else if(!result) {
            req.result.questions = null;
            next();
        } else if (result) {
            req.result.questions = result;
            next();
        }
    });
};

exports.read = (req, res) => {
    res.json(req.result);
};
