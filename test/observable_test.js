/*globals TestCase, assertEquals, assertTrue, assertFalse, assertException, assertNoException, AKAFRED */

var testCase = TestCase;

(function () {
    "use strict";

    testCase("ObservableObserveTest", {
        setUp: function () {
            this.observable = Object.create(AKAFRED.util.observable);
        },
        "test should store function": function () {
            var observers = [function () {}, function () {}];

            this.observable.observe(observers[0]);
            this.observable.observe(observers[1]);

            assertTrue(this.observable.hasObserver(observers[0]));
            assertTrue(this.observable.hasObserver(observers[1]));
        },
        "test should throw for uncallable observer": function () {
            var observable = Object.create(AKAFRED.util.observable);

            assertException(function () {
                observable.observe({});
            }, "TypeError");
        }
    });
    testCase("ObservableHasObserverTest", {
        "test should return false when no observers": function () {
            var observable = Object.create(AKAFRED.util.observable);

            assertFalse(observable.hasObserver(function () {}));
        }
    });
    testCase("ObservableNotifyTest", {
        setUp: function () {
            this.observable = Object.create(AKAFRED.util.observable);
        },
        "test should pass through arguments": function () {
            var actual = [];

            this.observable.observe(function () {
                actual = arguments;
            });

            this.observable.notify("String", 1, 32);

            assertEquals(["String", 1, 32], actual);
        },
        "test should notify all even if some fail": function () {
            var observer1 = function () { throw new Error("Oops!"); },
                observer2 = function () { observer2.called = true; };

            this.observable.observe(observer1);
            this.observable.observe(observer2);
            this.observable.notify();

            assertTrue(observer2.called);
        },
        "test should call observers in the order they were added": function () {
            var calls = [],
                observer1 = function () { calls.push(observer1); },
                observer2 = function () { calls.push(observer2); };

            this.observable.observe(observer1);
            this.observable.observe(observer2);
            this.observable.notify();

            assertEquals(observer1, calls[0]);
            assertEquals(observer2, calls[1]);
        },
        "test should not fail if no observers": function () {
            var that = this;
            assertNoException(function () {
                that.observable.notify();
            });
        }
    });
}());

