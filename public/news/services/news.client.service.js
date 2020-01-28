angular.module('News')
.service('ArticleProvider', ['$resource', function($resource) {
    var self = this;
    function Article(args) {
        this.id = args.id;
        this.title = args.title;
        this.article = args.article;
        this.image = args.image;
    }
    self.Articles = $resource('http://localhost:3000/articles', {}, {update: {action: 'PUT'}});
    self.PhoneArticles = $resource('http://localhost:3000/articles/phone', {}, {update: {action: 'PUT'}});
    self.LaptopArticles = $resource('http://localhost:3000/articles/laptop', {}, {update: {action: 'PUT'}});

}])
.service('FeaturedNews', ['ArticleProvider', function(ArticleProvider) {
    var self = this;
    self.news = ArticleProvider.Articles.query();
}]);