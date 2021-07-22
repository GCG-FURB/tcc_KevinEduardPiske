function PropertiesWrapper() {}

PropertiesWrapper.prototype = new Property();

PropertiesWrapper.prototype.type;
PropertiesWrapper.prototype.condition;

PropertiesWrapper.prototype.init = function(type, condition) {
	this.type = type;
	this.condition = condition;
	return this;
}

PropertiesWrapper.prototype.getElement = function() {
	return $('.property.' + this.type);
}

PropertiesWrapper.prototype.check = function(properties) {
	if (this.condition(properties)) {
		this.getElement().show();	
	} else {
		this.getElement().hide();		
	}
}