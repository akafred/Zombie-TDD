/*jslint  */
/*globals fail */
function assertPrototypeOf(proto, obj) {
    if (!proto.isPrototypeOf(obj)) {
        fail("expected proto to be prototype of object");
    }
}
