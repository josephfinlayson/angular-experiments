//module to create a directive
angular.module('moduleToExtend', [])
    .config(function($stateProvider) {
        // $stateProvider
        //     .state('inject', {
        //         url: '/inject',
        //         templateUrl: '/partial/inject.html',
        //         controller: 'injectCtrl'
        //     })
    }).controller(function() {

    }).directive('logger', function($rootScope, $compile) {
        // Runs during compile
        return {
            //won't work for our use case because we need to make it truly dynamic
            //taking from scope
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || 'partial/blueSquareTemplate.html';
            },
            controller: function($scope, $element, $attrs, $transclude) {
                this.api = {
                    save: function() {
                        console.log("saving in directive 1")
                    }
                }

            }
        }
    }).directive('eventBus', function() {
        // Runs during compile
        return {
            scope: {
                bus: '=?'
            },
            templateUrl: 'partial/busTrigger.html',
            controller: function($scope) {
                var bus = $scope.bus = $scope.bus || $({})

                bus.on('example', function(e, promise) {
                    promise.then(function(data) {
                        console.log(data)
                    })
                })

                $scope.trigger = function() {
                    bus.trigger('trigger', {
                        important: "data"
                    })
                }

            }
        };
    }).directive('sharedObject', function() {
        return {
            scope: {
                object: '=?'
            },
            templateUrl: 'partial/objshare.html',
            controller: function($scope) {
                var object = $scope.object = $scope.object || {}

                object.log = function() {
                    console.log("shared object")
                }
            }

        }
    })
