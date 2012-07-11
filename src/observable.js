/*jslint nomen: true */
/*globals AKAFRED, _*/

var AKAFRED = AKAFRED || {};
AKAFRED.util = AKAFRED.util || {};

(function () {
    "use strict";

    function observe(observer) {
        if (!this.observers) {
            this.observers = [];
        }
        if (typeof observer !== "function") {
            throw new TypeError("Observer is not a function");
        }

        this.observers.push(observer);
    }

    function hasObserver(observer) {
        if (!this.observers) {
            return false;
        }
        return _.indexOf(this.observers, observer) >= 0;
    }

    function notify() {
        var that = this, args = arguments;
        if (!this.observers) {
            return;
        }
        _.each(that.observers,
            function (observer) {
                try {
                    observer.apply(that, args);
                } catch (exception) {
                    /* ignore */
                }
            }
        );
    }

    AKAFRED.util.observable = {
        observe: observe,
        hasObserver: hasObserver,
        notify: notify
    }
}());
