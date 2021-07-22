function NumberInputProperty() {}

NumberInputProperty.prototype = new TextInputProperty();

NumberInputProperty.prototype.submit = function(selected, element) {
	var val = element.val();
	if ($.isNumeric(val)) {
		selected.properties[this.key] = parseFloat(val);
		this.trigger(selected);
	}
}

NumberInputProperty.prototype.evaluate = function(properties) {
	var val = properties[this.key];
	if (!$.isNumeric(val)) {
		val = 0;
	}
	this.getElement().val(val);
	
}