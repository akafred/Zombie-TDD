function stubFn(returnValue) {
    "use strict";
    var fn = function () {
        fn.called = true;
        fn.args = arguments;
        return returnValue;
    };

    fn.called = false;

    return fn;
}

