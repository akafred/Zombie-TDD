/*jslint nomen:true, plusplus:true */
/*globals XMLHttpRequest, ActiveXObject, _, tddjs */

var AKAFRED = this.AKAFRED || {};
AKAFRED.xhr = AKAFRED.xhr || {};

(function () {
    "use strict";
    var xhr = AKAFRED.xhr;

    function get(url) {
        if (typeof url !== "string") {
            throw new TypeError("URL must be provided");
        }
        var transport = xhr.create();
    }
    xhr.get = get;
}());

(function () {
    "use strict";
    var xhr, i, l,
        options = [
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            },
            function () {
                return new XMLHttpRequest();
            }
        ];
    for (i = 0, l = options.length; i < l; i++) {
        try {
            xhr = options[i]();
            if (typeof xhr.readyState === "number" &&
                    tddjs.isHostMethod(xhr, "open") &&
                    tddjs.isHostMethod(xhr, "send") &&
                    tddjs.isHostMethod(xhr, "setRequestHeader")) {
                AKAFRED.xhr.create = options[i];
                break;
            }
        } catch (e) {}
    }
}());
