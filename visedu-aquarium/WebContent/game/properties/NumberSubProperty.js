function NumberSubProperty() {}

NumberSubProperty.prototype = new TextInputProperty();

NumberSubProperty.prototype.submit = function(selected, element) {
	var val = element.val();
	if ($.isNumeric(val)) {
		selected.properties[this.type][this.key] = parseFloat(val);
		this.trigger(selected);
	}
}

NumberSubProperty.prototype.evaluate = function(properties) {
	var val = properties[this.type][this.key];
	if (!$.isNumeric(val)) {
		val = 0;
	}
	this.getElement().val(val);
	
}