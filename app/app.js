var app = angular.module('4Pics1Word', ['ngRoute'])

app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : 'views/home.html',
        controller: 'PicWordController',
        controllerAs: 'pw'
    })
});



