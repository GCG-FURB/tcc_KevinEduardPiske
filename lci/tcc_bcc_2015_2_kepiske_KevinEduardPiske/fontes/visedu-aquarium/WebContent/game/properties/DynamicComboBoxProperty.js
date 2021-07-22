function DynamicComboBoxProperty() {}

DynamicComboBoxProperty.prototype = new ComboBoxProperty();

DynamicComboBoxProperty.prototype.bind = function() {
	this.getElement().on('change', function (e) {
		var selected = $(PiecesController.selected).data('piece');
		var property = $(e.target).data('property');
		property.submit(selected, $(e.target));
		PropertiesController.setupProperties();
	});
}

DynamicComboBoxProperty.prototype.evaluate = function(properties) {
	var element = this.getElement();
	element.empty();
	var points = properties[this.type];
	$.each(points, function(index, item) {
		$('<option>').attr('value', index).html(item.toString()).appendTo(element);
	})
	var index = properties[this.key];
	element.val(index);
	
}