/*jslint newcap:true, bitwise:true, nomen:true, onevar:true, plusplus:true, regexp:true */

var ZOMBIE = this.ZOMBIE || {};

(function () {

    function validate(rows) {
        var row;
        if (!rows) {
            throw new TypeError("shape must be array");    
        }
        if (!rows.length || !rows[0].length) {
            throw { name: "ArgumentError", message: "shape cannot be empty" };
        }
        for (row = 0; row < rows.length; row += 1) {
            if (rows[row].length !== rows[0].length) {
                throw { name: "ArgumentError", message: "shape strings must be of equal length" };
            }
        }
    }
    
    function create(rows) {
        validate(rows);
        var self = Object.create(this);
        self.rows = rows;
        return self;
    }

	function toArray() {
		return this.rows;
	}
    function width() {
        return this.rows[0].length;
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
        for (row = 0; row < this.rows.length; row += 1) {
            result = result + this.rows[row][col];
        }
        return result;        
    }

    function rotate90() {
        return this.create(this.columns().reverse());
    }

    ZOMBIE.shape = {
        create: create,
		toArray: toArray,
        columns: columns,
        column: column,
        width: width,
        rotate90: rotate90
    };
}());