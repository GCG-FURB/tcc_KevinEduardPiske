function ColorInputProperty() {}

ColorInputProperty.prototype = new Property();

ColorInputProperty.prototype.bind = function() {
	this.getElement().on('input', function (e) {
		var selected = $(PiecesController.selected).data('piece');
		var property = $(e.target).data('property');
		property.submit(selected, $(e.target));
	});
}

ColorInputProperty.prototype.submit = function(selected, element) {
	selected.properties[this.key] = parseInt(element.val().replace('#', '0x'));
	this.trigger(selected);
}

ColorInputProperty.prototype.evaluate = function(properties) {
	var val = properties[this.key].toString(16);
	this.getElement().val('#' + Array(6-val.length+1).join('0').concat(val));
}