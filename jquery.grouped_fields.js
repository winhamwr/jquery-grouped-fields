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

/*
	* Get a dictionary of checkboxes with their value, display and groups.
	*/
FieldGroup.prototype._build_checkboxes = function(group_settings) {
	var boxes = {};

	for(var group_val in group_settings) {
		var group = group_settings[group_val];
		for(var i in group) {
			var box_val = group[i][0];
			var box_label = group[i][1];
			if(typeof(boxes[box_val]) == 'undefined') {
				// Brand new checkbox
				boxes[box_val] = {'label': box_label, 'groups': []};
			}
			boxes[box_val]['groups'].push(group_val);
		}
	}

	return boxes;
};

/*
	* Create checkboxes appended to the given element. The boxes list cont
	*
	* @name     _create_checkboxes
	* @param    element DOM element where the checkboxes will be appended
	* @param	boxes Array of 2-arrays corresponding to a checkboxes value and display
	*/
FieldGroup.prototype._create_checkboxes = function(element, boxes) {
};

})(jQuery);