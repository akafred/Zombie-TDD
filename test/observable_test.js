/*globals TestCase, assertEquals, assertTrue, assertFalse, assertException, assertNoException, fail, AKAFRED */

var testCase = TestCase;

(function () {
    "use strict";

    testCase("ObservableObserveTest", {
        setUp: function () {
            this.observable = Object.create(AKAFRED.util.observable);
        },
        "test should store function": function () {
            var observers = [function () {}, function () {}];

            this.observable.observe("event", observers[0]);
            this.observable.observe("event", observers[1]);

            assertTrue(this.observable.hasObserver("event", observers[0]));
            assertTrue(this.observable.hasObserver("event", observers[1]));
        },
        "test should throw for uncallable observer": function () {
            var observable = Object.create(AKAFRED.util.observable);

            assertException(function () {
                observable.observe("event", {});
            }, "TypeError");
        }
    });
    testCase("ObservableHasObserverTest", {
        "test should return false when no observers": function () {
            var observable = Object.create(AKAFRED.util.observable);

            assertFalse(observable.hasObserver("event", function () {}));
        }
    });
    testCase("ObservableNotifyTest", {
        setUp: function () {
            this.observable = Object.create(AKAFRED.util.observable);
        },
        "test should pass through arguments": function () {
            var actual = [];

            this.observable.observe("event", function () {
                actual = arguments;
            });

            this.observable.notify("event", "String", 1, 32);

            assertEquals(["String", 1, 32], actual);
        },
        "test should notify all even if some fail": function () {
            var observer1 = function () { throw new Error("Oops!"); },
                observer2 = function () { observer2.called = true; };

            this.observable.observe("event", observer1);
            this.observable.observe("event", observer2);
            this.observable.notify("event");

            assertTrue(observer2.called);
        },
        "test should call observers in the order they were added": function () {
            var calls = [],
                observer1 = function () { calls.push(observer1); },
                observer2 = function () { calls.push(observer2); };

            this.observable.observe("event", observer1);
            this.observable.observe("event", observer2);
            this.observable.notify("event");

            assertEquals(observer1, calls[0]);
            assertEquals(observer2, calls[1]);
        },
        "test should not fail if no observers": function () {
            var that = this;
            assertNoException(function () {
                that.observable.notify("event");
            });
        },
        "test should notify observers based on event": function () {
            var calls = [],
                observer1 = function () { calls.push(observer1); },
                observer2 = function () { calls.push(observer2); };

            this.observable.observe("anotherEvent", observer1);
            this.observable.observe("theEvent", observer2);
            this.observable.notify("theEvent");

            assertEquals(observer2, calls[0]);
        },
        "test should throw if notification lacks event": function () {
            var that = this;
            assertException(function () {
                that.observable.notify("");
            });
        }
    });
}());

