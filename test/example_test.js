TestCase("ExampleTest", sinon.testCase({
    setup: function() {
        
    },

    "test should do stuff": function() {
        sinon.stub(jQuery, "getJSON");
        MT.ajax_service.contact_server("url", 123);
        assert(jQuery.getJSON.called);
    }
}));
