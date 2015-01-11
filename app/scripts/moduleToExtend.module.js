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
    });