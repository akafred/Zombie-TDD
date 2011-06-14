/*jslint newcap:true, bitwise:true, nomen:true, onevar:true, plusplus:true, regexp:true */

var ZOMBIE = this.ZOMBIE || {};

(function () {

    function validate(shape) {
        var row;
        if (!shape) {
            throw new TypeError("shape must be array");    
        }
        if (!shape.length || !shape[0].length) {
            throw { name: "ArgumentError", message: "shape cannot be empty" };
        }
        for (row = 0; row < shape.length; row += 1) {
            if (shape[row].length !== shape[0].length) {
                throw { name: "ArgumentError", message: "shape strings must be of equal length" };
            }
        }
    }
    
    function create(shape) {
        validate(shape);
        var self = Object.create(this);
        self.shape = shape;
        return self;
    }

    function width() {
        return this.shape[0].length;
    }
    
    function columns() {
        var result = [],
            col;
        for (col = 0; col < this.width(); col += 1) {
            result.push(this.column(col));
        }
        return result;
    }

    function column(col) {
        var result = "",
            row;
        for (row = 0; row < this.shape.length; row += 1) {
            result = result + this.shape[row][col];
        }
        return result;        
    }

    function rotate90() {
        this.shape = this.columns().reverse();
        return this;
    }

    ZOMBIE.blueprint = {
        create: create,
        columns: columns,
        column: column,
        width: width,
        rotate90: rotate90
    };
}());