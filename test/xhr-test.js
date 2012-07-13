/*globals TestCase, AKAFRED, tddjs, stubFn, sinon,
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
        "test should call open with method, url, async flag": function () {
            var url, openStub = stubFn();

            xhr.create = stubFn({
                open: openStub
            });
            url = "/url";
            xhr.get(url);

            assertEquals(["GET", url, true], openStub.args);
        }
    });
}());

