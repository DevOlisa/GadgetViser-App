angular.module('News')
    .controller('NewsController', ['$scope', 'ArticleProvider', function ($scope, ArticleProvider) {
        var init = function () {
            $scope.NewsArticle = false;
            $scope.news = ArticleProvider.Articles.query();
            $scope.selectedArticle = null;
        };
        init();
    }])
    .controller('FeaturedArticleController', ['ArticleProvider', '$location', '$interval', 'ObjectStateService',
        function (ArticleProvider, $location, $interval, ObjectStateService) {
            var self = this;
            switch ($location.path()) {
                case '/laptops':
                    self.FeaturedArticles = ArticleProvider.LaptopArticles.query();
                    break;
                case '/phones':
                    self.FeaturedArticles = ArticleProvider.PhoneArticles.query();
                    break;
                default:
                    self.FeaturedArticles = ArticleProvider.Articles.query();
            }

            self.currentFeaturedArticle = self.FeaturedArticles[0];
            self.slideDuration = 5000;
            self.index = 0;

            function getNextArticle() {
                if (self.index === (self.FeaturedArticles.length - 1)) {
                    self.index = -1;
                }
                self.currentFeaturedArticle = self.FeaturedArticles[++self.index];
                ObjectStateService.state = self.currentFeaturedArticle._id;
            };

            var startCarousel = function () {
                $interval(function () {
                    getNextArticle();
                }, self.slideDuration);
            };

            self.init = function () {
                // Initialize carousel
                startCarousel();
            };

            self.init();
        }])