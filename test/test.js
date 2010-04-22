var testArea = '#testarea';
var form_html = '' +
	'<form>' +
		'<select id="properish_two_divisors" name="properish_two_divisors">' +
			'<option value="1">one</option>' +
			'<option selected="selected" value="2">two</option>' +
			'<option value="3">three</option>' +
			'<option value="4">four</option>' +
			'<option value="5">five</option>' +
			'<option value="6">six</option>' +
			'<option value="7">seven</option>' +
			'<option value="8">eight</option>' +
			'<option value="9">nine</option>' +
			'<option value="10">ten</option>' +
			'<option value="11">eleven</option>' +
			'<option value="12">twelve</option>' +
		'</select>' +
	'</form>';
var select_selector = '#properish_two_divisors';
var group_settings = {
	'1': [['1', 'one']],
	'2': [['1', 'one'], ['2', 'two']],
	'3': [['1', 'one'], ['3', 'three']],
	'4': [['2', 'two']],
	'5': [['1', 'one'], ['5', 'five']],
	'6': [['2', 'two'], ['3', 'three']],
	'7': [['1', 'one'], ['7', 'seven']],
	'8': [['2', 'one'], ['4', 'four']],
	'9': [['3', 'three']],
	'10': [['2', 'two'], ['5', 'five']],
	'11': [['1', 'one'], ['11', 'eleven']],
	'12': [['2', 'two'], ['3', 'three'], ['4', 'four'], ['6', 'six']],
};
var checkbox_vals = ['1', '2', '3', '4', '5', '6', '7', '11'];
var boxes = {
	'1': {
		'label': 'one',
		'groups': [
			'1', '2', '3', '5', '7', '11'
		]
	},
	'2': {
		'label': 'two',
		'groups': [
			'2', '4', '6', '8', '10', '12'
		]
	},
	'3': {
		'label': 'three',
		'groups': [
			'3', '6', '9', '12'
		]
	},
	'4': {
		'label': 'four',
		'groups': [
			'8', '12'
		]
	},
	'5': {
		'label': 'five',
		'groups': [
			'5', '10'
		]
	},
	'6': {
		'label': 'six',
		'groups': [
			'12'
		]
	},
	'7': {
		'label': 'seven',
		'groups': [
			'7',
		]
	},
	'11': {
		'label': 'eleven',
		'groups': [
			'11',
		]
	},
};

module("init test", {
	setup: function() {
		$('body').append('<div id="testarea"></div>');
		$(testArea).append(form_html);
	},
	teardown: function() {
		$(testArea).remove();
	}
});

test("Select box becomes disabled", 1, function() {
	$(select_selector).fieldGroup(group_settings, {});

	equals($(select_selector).attr('disabled'), true);
});

test("Checkbox building", function() {
	var fg = $(select_selector).fieldGroup(group_settings, {});

	var built_checkboxes = fg._build_checkboxes(group_settings);

	for(var i in built_checkboxes) {
		same(built_checkboxes[i], boxes[i]);
	}
	for(var i in boxes) {
		same(built_checkboxes[i], boxes[i]);
	}
});

test("Checkboxes created", 1, function() {
	$(select_selector).fieldGroup(group_settings, {});

	var num_checkboxes_expected = 0;
	for(var i in boxes) {
		num_checkboxes_expected++;
	}
	var checkboxes = $(testArea).find('input[type=checkbox]');

	equals(checkboxes.length, num_checkboxes_expected);
});

test("Checkbox defaults checked", 3, function() {
	$(select_selector).fieldGroup(group_settings, {});

	// Should be the 1 and 2 checkboxes checked and nothing else
	var checked = $(testArea).find(':checked');

	equals(checked.length, 2);

	checked.each(function(index, element) {
		var val = $(element).val();
		ok(val == '1' || val == '2', "Proper boxes are checked");
	});


});