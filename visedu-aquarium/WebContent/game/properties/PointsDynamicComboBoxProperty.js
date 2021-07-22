function PointsDynamicComboBoxProperty() {}

PointsDynamicComboBoxProperty.prototype = new DynamicComboBoxProperty();

PointsDynamicComboBoxProperty.prototype.submit = function(selected, element) {
	selected.properties[this.key] = element.val();
	PropertiesController.setupProperties();
	this.trigger(selected);
}
