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


    var createNews = function () {
        var news = [];
        news.push(new Article({
            id: 1,
            title: "Foldable Phones Are Cool But The Tech Isn't Ready For Prime Time",
            article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "./img/galaxy-fold-coffee-shop_0.jpg"
        })
        );
        news.push(new Article({
            id: 2,
            title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
            article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "./img/127399_adapted_1440x2560.jpg"
        })
        );
        news.push(new Article({
            id: 3,
            title: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam",
            article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "./img/DigitalArt.gif"
        })
        );
        return news;
    };
    self.news = createNews();
}])
.service('FeaturedNews', ['ArticleProvider', function(ArticleProvider) {
    var self = this;
    self.news = ArticleProvider.Articles.query();
}]);