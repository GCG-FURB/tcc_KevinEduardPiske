function PointsLengthProperty() {}

PointsLengthProperty.prototype = new NumberInputProperty();

PointsLengthProperty.prototype.submit = function(selected, element) {
	var val = element.val();
	if ($.isNumeric(val)) {
		var floatVal = parseFloat(val);
		if (floatVal > 0) {
			selected.properties[this.key] = floatVal;
			this.updateArray(selected.properties, floatVal);
			this.trigger(selected);
		}
	}
}

PointsLengthProperty.prototype.updateArray = function(properties, length) {
	var array = properties['points'];
	var lenArray = Object.keys(array).length;
	if (length > lenArray) {
		for (var i = lenArray; i < length; i++) {
			array[i] = (new Point3D().initialize(0, 0, 0));
		}
	} else if (length < lenArray) {
		for (var i = length; i < lenArray; i++) {
			delete array[i];			
		}
	}
	var index = properties['points_index'];
	if (index >= length) {
		 properties['points_index'] = '0';
	}
	PropertiesController.setupProperties();
	
}