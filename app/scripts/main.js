angular.module('experiment', ['ui.router', 'moduleToExtend', 'eventBus'])
    .config(function($stateProvider, $sceDelegateProvider) {

        Parse.initialize("kz2K16qPwUyX143ijM7OhWgDNxs6wXBiTkRiyE95", "DsELrqBnPYhxrRjomGYT0CggzcxzNS8W9QltFKwu")

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: '/partial/main.html',
                controller: 'mainCtrl'
            })
            .state('secondary', {
                url: '/secondary',
                templateUrl: '/partial/secondary.html',
                controller: 'secondaryCtrl'
            })
            .state('simpleForm', {
                url: '/simpleForm',
                templateUrl: '/partial/simpleForm.html',
                controller: 'simpleFormController'
            })
            .state('parse', {
                url: '/parse',
                templateUrl: '/partial/parse.html',
                controller: 'parseController'
            })
        $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://getsimpleform.com/**']);

    })
    .service('dataSharer', function() {
        var widgets = [];
        return {
            get: function() {
                return widgets
            },
            set: function(wid) {
                widgets.push(wid)
            }
        }
    })
    .controller('mainCtrl', function() {})
    .controller('secondaryCtrl', function() {})
    .controller('simpleFormController', function($scope, simpleFormService) {
        $scope.click = function() {
            simpleFormService({
                more: "data"
            })
        }
    })
    .controller('parseController', function($scope, parse, $timeout) {
        $scope.click = function() {
            parse.set({
                "data": $scope.formData
            }).then(function(data) {
                console.log(data)
                $scope.data = data;
            })
        }

        parse.get().then(function(data) {
            $timeout(function() {
                console.log(data)
                data.forEach(function(d) {
                    console.log(d.get())
                })
                $scope.oldData = data
            })

        })
    })
    .service('simpleFormService', function($http) {
        return function(data) {
            $http.post('http://getsimpleform.com/messages.json?form_api_token=fc5ad635836677cc4b15eff1a73e72af', {
                'some': 'arbitrary',
                'data': 'here',
            }).then(function(a) {
                console.log(a)
            })
        }
    })
    .service('parse', function() {
        var parseModel = Parse.Object.extend('ngData');
        var ngData = new parseModel();

        var query = new Parse.Query(parseModel);
        return {
            set: function(experimentData) {
                //return promise object
                return ngData.save({
                    test: "experimentData",
                    data: experimentData
                })
            },

            get: function() {
                return query.find({
                    success: function(results) {
                        for (var i = 0; i < results.length; i++) {
                            //iterate?
                        }
                    }
                })

            }
        }

    })
    .factory('stateBinder', function() {
        var obj = {

            eventsArray: [],
            get events() {
                return this.eventsArray;
            },
            setEvent: function(selector, state, event, handler) {
                this.eventsArray.push({
                    selector: selector,
                    state: state,
                    event: event,
                    handler: handler
                })
            },
        }
        return obj
    })
    .run(function($rootScope, stateBinder, $injector) {
        $rootScope.$on('$stateChangeSuccess', function(_event, stateObject) {
            var events = stateBinder.events

            var bindEvents = function(event) {
                if (stateObject.name === event.state) {
                    $(event.selector).bind(event.event, event.handler)
                }
            }
            if (events) {
                events.forEach(bindEvents)
            }
        })


        $.fn.extend({
            //temporary bind, gets cleared on every state change
            tbind: function() {

            },

            //angular bind, takes a state and will only be bound on that state
            abind: function(event, handler, state) {
                // console.log(this, state, event, handler)
                $injector.get('stateBinder').setEvent(this.selector, state, event, handler)
            }
        })

        $rootScope.$on('$stateChangeStart', function(event, stateObject) {
            var events = stateBinder.events
            var unBindEvents = function(event) {
                $(event.selector).unbind(event.event, event.handler)

            }
            if (events) {
                events.forEach(unBindEvents)
            }
        })

    }).run(function() {
        var logEvent = function(event) {
            console.log("Logged event:", event)
        }

        $('body').abind('click', logEvent, 'main');
    })
