function CheckBoxProperty() {}

CheckBoxProperty.prototype = new Property();

CheckBoxProperty.prototype.bind = function() {
	this.getElement().click(function (e) {
		var selected = $(PiecesController.selected).data('piece');
		var property = $(e.target).data('property');
		property.submit(selected, $(e.target));	
	});
}


CheckBoxProperty.prototype.submit = function(selected, element) {
	selected.properties[this.key] = element.is(':checked');
	this.trigger(selected);
}

CheckBoxProperty.prototype.evaluate = function(properties) {
	this.getElement().prop('checked', properties[this.key]);
}