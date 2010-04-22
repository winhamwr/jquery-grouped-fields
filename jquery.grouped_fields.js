;(function($) {

/*
 * Turn a select input into a set of checkboxes that only allow valid combinations
 * according to the selectbox.
 *
 * @name     fieldGroup
 * @param    groups A dictionary mapping select options to the elements they represent
 * @example  $('#select_id').fieldGroup({
	'2': [['1', 'one'], ['2', 'two']],
	'4': [['1', 'one'], ['2', 'two'], ['4', 'four']]});
 */
$.fn.fieldGroup = function(groups, options) {
	var fieldGroup = new FieldGroup(options, this);
	this._fieldGroup = fieldGroup;

	return fieldGroup;
};

function FieldGroup(options, elmnt) {
	this.$elmnt = $(elmnt);

	settings = jQuery.extend({

		field_prefix: 'jqgf_'

	}, options);

	this.settings = settings;

	this.init();
};

FieldGroup.prototype.init = function() {
	// Disable the selectbox
	this.$elmnt.attr('disabled', 'disabled');
};

})(jQuery);