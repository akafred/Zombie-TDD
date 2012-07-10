/*jslint bitwise: true, nomen: true, plusplus: true, regexp: true*/
/*globals TestCase, ZOMBIE, assertEquals, assertException, assertObject, assertPrototypeOf, sinon */

(function (shape) {
    "use strict";
    var testCase = TestCase;

    testCase("ShapeTest", sinon.testCase({

        "test should be an object": function () {
            assertObject(shape);
        },

        "test should create shapes": function () {
            var aShape = shape.create(['*']);
            assertPrototypeOf(shape, aShape);
        },

        "test should have toArray()": function () {
            var s = ['***',
                     '***'],
                aShape = shape.create(s);
            assertEquals(s, aShape.toArray());
        },

        "test should complain about missing shape": function () {
            assertException(function () {
                shape.create();
            });
        },

        "test should complain about empty shape": function () {
            assertException(function () {
                shape.create([]);
            });
        },

        "test should complain about irregular shape": function () {
            assertException(function () {
                shape.create(['*', '']);
            });
        },

        "test should return columns": function () {
            var aShape = shape.create(['* ',
                                       '**']);
            assertEquals(['**', ' *'], aShape.columns());
        },

        "test should have return correct width": function () {
            var aShape = shape.create(['**']);
            assertEquals(2, aShape.width());
        }

    }));

    function assertRotation(before, after) {
        var aShape = shape.create(before),
			newShape = aShape.rotate90();
        assertEquals(after, newShape.toArray());
    }

    testCase("ShapeRotateTest", sinon.testCase({
        "test should rotate single cell": function () {
            assertRotation(['*'], ['*']);
        },

        "test should rotate vertical line": function () {
            assertRotation(['*', '*'], ['**']);
        },

        "test should rotate horizontal line": function () {
            assertRotation(['**'], ['*', '*']);
        },

        "test should rotate L-shape": function () {
            assertRotation(["**", "* "], ["* ", "**"]);
        },

        "test should rotate T-shape": function () {
            assertRotation(["***",
                            " * ",
                            " * "],
                           ["*  ",
                            "***",
                            "*  "]);
        }
    }));

}(ZOMBIE.shape));
