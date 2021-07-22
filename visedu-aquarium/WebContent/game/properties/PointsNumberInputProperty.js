function PointsNumberInputProperty() {}

PointsNumberInputProperty.prototype = new NumberInputProperty();

PointsNumberInputProperty.prototype.submit = function(selected, element) {
	var val = element.val();
	if ($.isNumeric(val)) {
		selected.properties['points'][selected.properties['points_index']][this.key] = parseFloat(val);
		PropertiesController.setupProperties();
		this.trigger(selected);
	}
}

PointsNumberInputProperty.prototype.evaluate = function(properties) {
	var val = properties['points'][properties['points_index']][this.key];
	if (!$.isNumeric(val)) {
		val = 0;
	}
	this.getElement().val(val);
	
}