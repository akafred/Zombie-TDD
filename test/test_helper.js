/*jslint newcap:true, bitwise:true, nomen:true, plusplus:true, regexp:true */
/*globals fail */

function assertPrototypeOf(proto, obj) {
    "use strict";
    if (!proto.isPrototypeOf(obj)) {
        fail("expected proto to be prototype of object");
    }
}
