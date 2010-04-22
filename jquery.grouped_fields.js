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
	var fieldGroup = new FieldGroup(options, this, groups);
	this._fieldGroup = fieldGroup;

	return fieldGroup;
};

function FieldGroup(options, select_element, groups) {
	this.$select_element = $(select_element);
	this.groups = groups;

	settings = jQuery.extend({

		field_prefix: 'jqgf_',

		after_element: this.$select_element,

	}, options);

	this.settings = settings;

	this.init();
};

FieldGroup.prototype.init = function() {
	// Disable the selectbox
	this.$select_element.attr('disabled', 'disabled');

	// Build and create the checkboxes
	this.checkbox_confs = this._build_checkboxes(this.groups)
	var after_element =  this.settings['after_element'];
	this._create_checkboxes($(after_element), this.checkbox_confs);

	// Make sure the required boxes are selected to start
	this.update_boxes_from_select(this.$select_element);

	var box_class = this.settings['field_prefix'] + 'box';
	var fg = this;
	fg.updating_boxes = false;
	$('.'+box_class).change(function() {
		if(fg.updating_boxes == true){
			return;
		}
		fg.updating_boxes = true;
		fg.disable_invalid_boxes();
		fg.updating_boxes = false;
	});
};

FieldGroup.prototype.update_boxes_from_select = function($select_element) {
	var selected_options = $select_element.find(':selected');
	if(selected_options.length != 1) {
		return;
	}

	var opt = selected_options[0];
	var group_val = $(opt).val();
	this.check_boxes(group_val);
};

FieldGroup.prototype.check_boxes = function(group_val) {
	var group = this.groups[group_val];

	for(var i in group) {
		var box_val = group[i][0];
		var box_label = group[i][1];
		var box_id = this.settings['field_prefix'] + 'box_' + box_val;
		$('#'+box_id).attr('checked', true);
	}
};

/*
 * Disable any boxes that aren't valid given the current set of checked boxes.
 */
FieldGroup.prototype.disable_invalid_boxes = function() {
	var box_class = this.settings['field_prefix'] + 'box';
	var checked_boxes = $('.'+box_class+':checked');

	var possible_groups = [];

	var fg = this;
	// Figure out which groups are still possible
	checked_boxes.each(function(i) {
		var box_val = $(this).val();
		if(possible_groups.length == 0) {
			// When the list is empty, add the first available
			possible_groups += fg.checkbox_confs[box_val]['groups'];
		}else {
			// Only keep the intersection
			var new_groups = fg.checkbox_confs[box_val]['groups'];
			var new_possible_groups = [];
			for(var i in possible_groups){
				var possible_group = possible_groups[i];
				if(possible_group in new_groups){
					new_possible_groups.push(possible_group);
				}
			}
			possible_groups = new_possible_groups;
		}
	});

	// Disable all of the boxes
	$('.'+box_class).attr('disabled', true);

	// Enable all of the boxes that are still possible for their groups
	for(var i in possible_groups) {
		var box_infos = possible_groups[i];
		for(var box_i in box_infos) {
			var box_val = box_infos[box_i][0];
			var box_id = this.settings['field_prefix'] + 'box_' + box_val;
			$('#'+box_id).attr('disabled', false);
		}
	}

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
 * Create checkboxes after to the given element. The boxes list cont
 *
 * @name     _create_checkboxes
 * @param    element DOM element where the checkboxes will be appended
 * @param	boxes Array of 2-arrays corresponding to a checkboxes value and display
 */
FieldGroup.prototype._create_checkboxes = function(element, boxes) {
	var field_prefix = this.settings['field_prefix'];

	for(var box_val in boxes) {
		var box = boxes[box_val];
		var box_id = field_prefix + 'box_' + box_val;
		var box_name = field_prefix + 'box';
		var label = box['label'];
		var classes = box_name+' ';
		for(var i in box['groups']) {
			classes += field_prefix + 'group_' + box['groups'][i] + ' ';
		}
		var html = '' +
			'<br /><input type="checkbox" ' +
			'name="'+box_name+'" id="'+box_id+'" value="'+box_val+'" ' +
			'class="'+classes+'" ' +
			'/>' +
			'<label for="'+box_id+'">'+label+'</label>';


		element.after(html);
	}
};

})(jQuery);