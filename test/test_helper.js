/*jslint newcap:true, bitwise:true, nomen:true, onevar:true, plusplus:true, regexp:true */
/*globals fail */
function assertPrototypeOf(proto, obj) {
    if (!proto.isPrototypeOf(obj)) {
        fail("expected proto to be prototype of object");
    }
}
