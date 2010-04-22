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