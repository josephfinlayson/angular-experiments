angular.module('eventBus', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('eventbus', {
                url: '/eventbus',
                templateUrl: '/partial/eventbus.html',
                controller: 'eventBus',
            })
    }).controller('eventBus', function($scope, $q, $timeout) {

        var bus = $scope.bus = $scope.bus || $({})

        bus.on('trigger', function(data) {
            console.log("logging " + data + " from controller")
        })

        var deferred = $q.defer()
        $timeout(function() {
            deferred.resolve('Promise')
            bus.trigger('example', deferred.promise)
        }, 500)


    })
