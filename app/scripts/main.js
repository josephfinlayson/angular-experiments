var stateBinder

angular.module('experiment', ['ui.router'])
    .config(function($stateProvider) {
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

    })
    .controller('mainCtrl', function() {})
    .controller('secondaryCtrl', function() {})
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
