/* global describe, it */

(function() {
    'use strict';

    describe('Testing angular services', function() {
       var service;
        before(function() {
            var app = angular.module('experiment');
            var injector = angular.injector(['experiment', 'ng']);
            service = injector.get('stateBinder');
            service.setEvent('a', 'b','c','d')
        });


        describe('testing result if we set a value', function() {
            it('should run here few assertions', function() {
                var events = service.getEvents()
                console.log(events)
                assert.equal(events[0], {
                    selector: 'a',
                    state: 'b',
                    event: 'c',
                    handler: 'd'
                })
            });
        });
    });
})();
