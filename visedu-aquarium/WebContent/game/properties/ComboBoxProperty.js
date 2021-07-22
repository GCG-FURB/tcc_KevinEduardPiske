function ComboBoxProperty() {}

ComboBoxProperty.prototype = new Property();

ComboBoxProperty.prototype.bind = function() {
	this.getElement().on('change', function (e) {
		var selected = $(PiecesController.selected).data('piece');
		var property = $(e.target).data('property');
		property.submit(selected, $(e.target));
		PropertiesController.setupProperties();
	});
}