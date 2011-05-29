/* global MT, jQuery 
*/

var MT = MT || {};

(function () {
    
    MT.ajax_service = {
        contact_server : function(url, params) {
            jQuery.getJSON(url, params);
        }
    };
    
}(jQuery)); 
