/*globals module*/

module.exports = {
    paths: [ "./src/*.js", "./test/*.js" ],   // a list of paths to the files you want linted
    linter: "jslint",         // optionally: jshint
    linterOptions: {          // see default-configuration.js for a list of all options
        "goodparts": true,
        "onevar": false,
        "maxlen": 140
    }
};
