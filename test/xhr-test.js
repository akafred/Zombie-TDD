/*globals TestCase, AKAFRED, tddjs, sinon,
  assert, assertNumber, assertEquals, assertFunction, assertException, assertObject, assertPrototypeOf */

(function () {
    "use strict";
    var testCase = TestCase,
        xhr = AKAFRED.xhr;

    testCase("XhrCreateTest", {
        "test should return XMLHttpRequest object": function () {
            var testXhr = xhr.create();

            assertNumber(testXhr.readyState);
            assert(tddjs.isHostMethod(testXhr, "open"));
            assert(tddjs.isHostMethod(testXhr, "send"));
            assert(tddjs.isHostMethod(testXhr, "setRequestHeader"));
        }
    });

    testCase("XhrGetRequestTest", {
        setUp: function () {
            this.xhrCreate = xhr.create;
        },
        tearDown: function () {
            xhr.create = this.xhrCreate;
        },
        "test should define get method": function () {
            assertFunction(xhr.get);
        },
        "test should throw withpout url": function () {
            assertException(function () {
                xhr.get();
            }, "TypeError");
        },
        "test should obtain an XMLHttpRequest object": function () {
            xhr.create = function () {
                xhr.create.called = true;
            };

            xhr.get("/url");

            assert(xhr.create.called);
        }
    });
}());

