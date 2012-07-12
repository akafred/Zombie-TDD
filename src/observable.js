/*jslint nomen: true */
/*globals AKAFRED, _*/

var AKAFRED = AKAFRED || {};
AKAFRED.util = AKAFRED.util || {};

(function () {
    "use strict";

    function _checkEvent(event) {
        if (typeof event !== "string" || event === "") {
            throw new TypeError("needs a string event argument");
        }
    }

    function _observers(observable, event) {
        _checkEvent(event);
        if (!observable.observers) {
            observable.observers = {};
        }
        if (!observable.observers[event]) {
            observable.observers[event] = [];
        }
        return observable.observers[event];
    }

    function observe(event, observer) {
        var observers = _observers(this, event);
        if (typeof observer !== "function") {
            throw new TypeError("Observer is not a function");
        }

        observers.push(observer);
    }

    function hasObserver(event, observer) {
        var observers = _observers(this, event);
        return _.indexOf(observers, observer) >= 0;
    }

    function notify() {
        var that = this,
            args = Array.prototype.slice.apply(arguments),
            event = args.shift(),
            observers = _observers(that, event);

        _.each(observers, function (observer) {
            try {
                observer.apply(that, args);
            } catch (exception) {
                /* ignore */
            }
        });
    }

    AKAFRED.util.observable = {
        observe: observe,
        hasObserver: hasObserver,
        notify: notify
    };
}());
