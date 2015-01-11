//demonstrates modifying directive in an instatiation
//creating another module that instantiates directive
angular.module('experiment')
    .config(function($stateProvider) {
        $stateProvider
            .state('inject', {
                url: '/inject',
                templateUrl: '/partial/inject.html',
                controller: 'injectCtrl'
            })
    }).controller('injectCtrl', function($scope, loggerDirective) {
        $scope.api = {}
    }).directive('logger', function() {
        // Runs during compile
        return {
            require: ['logger'],
            link: function($scope, $element, $attrs, loggerCtrl) {

                var parentCtrl = loggerCtrl[0]

                $scope.api.save = function() {
                    parentCtrl.api.save()
                    console.log("save in directive 2")
                }
            },
        }
    });
// .directive('list', function(listService) {
//     // Runs during compile
//     return {
//         link: function($scope, iElm, iAttrs, controller) {
//             var updateList = function() {
//                 listService.getList().then(function(data) {
//                     scope.list = data
//                 })
//             }

//         }
//     };
// }).service('listService', function($q) {
//     var deferred = $q.defer();
//     var list = [];
//     return {
//         getList: function() {
//             deferred.resolve(list)

//             return deferred.promise
//         }
//     }

// })
