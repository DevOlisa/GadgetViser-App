const article = require('../controllers/articles.server.controllers');

module.exports = (app) => {
    app.route('/articles')
        .get(article.list)
        .post(article.create);

    app.route('/articles/:category')
    .get(article.readList);

    app.param('category', article.fetchCategory);
};