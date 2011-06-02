/*jslint newcap:true */
/*globals TestCase, ZOMBIE, assertEquals, assertException, assertObject, assertPrototypeOf, sinon */

(function (blueprint) {
    TestCase("BlueprintTest", sinon.testCase({

        setUp: function () {
            blueprint = ZOMBIE.blueprint;
        },

        "test should be an object": function () {
            assertObject(blueprint);
        },  

        "test should create blueprints": function () {
            var bp = blueprint.create([]);
            assertPrototypeOf(blueprint, bp);
        },

        "test should have shape": function () {
            var shape = ['***',
                         '***'];
            var bp = blueprint.create(shape);             
            assertEquals(shape, bp.shape);
        },

        "test should complain about missing shape": function () {
            assertException(function () {
                blueprint.create();
            });
        }

    }));
}(ZOMBIE.blueprint));
