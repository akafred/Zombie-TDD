/*jslint newcap:false, bitwise:true, nomen:true, onevar:true, plusplus:true, regexp:true */
/*globals TestCase, ZOMBIE, assertEquals, assertException, assertObject, assertPrototypeOf, sinon */

(function (blueprint) {
    TestCase("BlueprintTest", sinon.testCase({

        "test should be an object": function () {
            assertObject(blueprint);
        },

        "test should create blueprints": function () {
            var bp = blueprint.create(['*']);
            assertPrototypeOf(blueprint, bp);
        },

        "test should have shape": function () {
            var shape = ['***',
                         '***'],
                bp = blueprint.create(shape);
            assertEquals(shape, bp.shape);
        },

        "test should complain about missing shape": function () {
            assertException(function () {
                blueprint.create();
            });
        },
        
        "test should complain about empty shape": function () {
            assertException(function () {
                blueprint.create([]);
            });
        },
        
        "test should complain about irregular shape": function () {
            assertException(function () {
                blueprint.create(['*', '']);
            });
        },

        "test should return columns": function () {
            var bp = blueprint.create(['* ',
                                       '**']);
            assertEquals(['**', ' *'], bp.columns());            
        },
        
        "test should have return correct width": function () {
            var bp = blueprint.create(['**']);
            assertEquals(2, bp.width());
        }
        
    }));

    function assertRotation(before, after) {
        var bp = blueprint.create(before);
        assertEquals(after, bp.rotate90().shape);
    }

    TestCase("BlueprintRotateTest", sinon.testCase({
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

}(ZOMBIE.blueprint));
