//demonstrates modifying directive in an instatiation
//creating another module that instantiates directive
angular.module('experiment')
    .config(function($stateProvider) {
        $stateProvider
            .state('sharedObject', {
                url: '/shared',
                templateUrl: '/partial/sharedObj.html',
                controller: 'shareCtrl'
            })
    }).controller('shareCtrl', function($scope, loggerDirective, $timeout) {
        var sharedObject = $scope.sharedObject = $scope.sharedObject || {}

        $timeout(function() {
            $scope.sharedObject.log()
        }, 200)
    })
