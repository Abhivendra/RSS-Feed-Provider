'use strict';

var App = angular.module('RSSFeedApp', []);

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {    
    $scope.loadButonText="Load";
    $scope.myHTML =
     'I am an <code>HTML</code>string with ' +
     '<a href="#">links!</a> and other <em>stuff</em>'
    $scope.loadFeed=function(e){        
        Feed.parseFeed($scope.feedSrc).then(function(res){
            console.log("res:" , res)

            $scope.feeds=res.data.responseData.feed.entries;
            console.log($scope.feeds);
        });
    }
}]);

App.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

App.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
