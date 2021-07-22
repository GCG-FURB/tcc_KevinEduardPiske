function LabelMatrixProperty() {}

LabelMatrixProperty.prototype = new Property();

LabelMatrixProperty.prototype.evaluate = function(properties) {
	var val = properties[this.key];	
	var el = this.getElement();
	el.empty();
	this.concat(el, val, 0);
	this.concat(el, val, 1);
	this.concat(el, val, 2);
	this.concat(el, val, 3);
}

LabelMatrixProperty.prototype.concat = function(element, array, index) {
	for (i=0; i < 4; i++) {
		$('<div>').html(array[(i*4)+index].toFixed(3)).addClass('cell-matrix').appendTo(element);
	}
	element.append($('<br/>'));	
}