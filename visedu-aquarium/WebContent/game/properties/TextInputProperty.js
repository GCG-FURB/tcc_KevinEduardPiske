function TextInputProperty() {}

TextInputProperty.prototype = new Property();

TextInputProperty.prototype.bind = function() {
	this.getElement().keydown(function (e) {
		var code = e.keyCode || e.which;
		if (code === 9 || code === 13 || code === 38  || code === 40) {
			var selected = $(PiecesController.selected).data('piece');
			var property = $(e.target).data('property');
			property.submit(selected, $(e.target));
			PropertiesController.setupProperties();
		}
	});
}