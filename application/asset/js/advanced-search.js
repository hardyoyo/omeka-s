$(document).ready( function() {

// Remove all names from query form elements.
$('.query-type, .query-text, .query-property').attr('name', null);

// Bypass regular form handling for value, property, and has property queries.
$('#advanced-search').submit(function(event) {
    $('#property-queries').find('.value').each(function(index) {
        var text = $(this).children('.query-text');
        if (!$.trim(text.val())) {
            return; // do not process an empty query
        }
        var propertyVal = $(this).children('.query-property').val();
        if (!$.isNumeric(propertyVal)) {
            propertyVal = 0;
        }
        var type = $(this).children('.query-type');
        $('<input>').attr('type', 'hidden')
            .attr('name', 'property[' + propertyVal + '][' + type.val() + '][]')
            .val(text.val())
            .appendTo('#advanced-search');
    });

    $('#has-property-queries').find('.value').each(function(index) {
        var property = $(this).children('.query-property');
        if (!$.isNumeric(property.val())) {
            return; // do not process an invalid property
        }
        var type = $(this).children('.query-type');
        $('<input>').attr('type', 'hidden')
            .attr('name', 'has_property[' + property.val() + ']')
            .val(type.val())
            .appendTo('#advanced-search');
    });
});

});
