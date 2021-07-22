function Property() {}

Property.prototype.id = '';
Property.prototype.type = '';
Property.prototype.key = '';
Property.prototype.reloadTree = false, 
Property.prototype.reloadScene = true,

Property.prototype.init = function (id, type, key, reloadTree, reloadScene, condition) {
	this.id = id;
	this.type = type;
	this.key = key;
	this.reloadTree = reloadTree;
	this.reloadScene = reloadScene;
	this.getElement().data("property", this);
	this.condition = condition ? condition: true;
	return this;
}

Property.prototype.bind = function() {}

Property.prototype.evaluate = function() {}

Property.prototype.getElement = function() {
	return $('.property.'+this.type).find('#'+this.id);
}

Property.prototype.trigger = function(piece) {
	piece.type.treeBehavior.reloadPiece(piece, this);
}

Property.prototype.submit = function(selected, element) {
	selected.properties[this.key] = element.val();
	this.trigger(selected);
}

Property.prototype.checkEvaluate = function(element, properties) {	
	if ($.isFunction(this.condition)) {
		if (this.condition(properties)) {
			element.show();
			this.evaluate(properties);
		}  else {
			element.hide();			
		}
	} else {
		this.evaluate(properties);
	}
}
Property.prototype.evaluate = function(properties) {
	this.getElement().val(properties[this.key]);
}