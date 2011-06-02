
var ZOMBIE = this.ZOMBIE || {};

ZOMBIE.blueprint = {
    create: function create(shape) {
        if (!shape) throw new TypeError("shape must be array");    
        var self = Object.create(this);
        self.shape = shape;
        return self;
    }
};
