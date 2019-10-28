const search = require('../controllers/search.server.controllers');

module.exports = (app) => {
    app.route('/search/:searchString')
        .get(search.gadgetSearch, search.articleSearch, search.questionSearch, search.read);

    app.param('searchString', search.handleSearch);
};