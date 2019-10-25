const Article = require('mongoose').model('Article');

exports.list = (req, res, next) => {
    Article.find({}, (err, articles) => {
        res.json(articles);
    }).sort({published: -1});
};

exports.create = (req, res, next) => {
    let article = new Article(req.body);

    article.save((err) => {
        if (err) next(err);
        res.json(article);
    })
};

exports.readList = (req, res) => {
    res.json(req.articles);
};

exports.fetchCategory = (req, res, next, category) => {
    Article.find({
        category: category
    }, (err, articles) => {
        if (err) {
            next(err);
        } else if(articles) {
            req.articles = articles;
            next();
        } else {
            next(new Error('Failed to load articles'));
        }
    });
};

exports.remove = (req, res, next, id) => {
    Article.remove({_id: id}, (err) => {
        if (err) return next(err);
        console.log('deleted')
    });
};