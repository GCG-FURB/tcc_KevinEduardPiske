function FileInputProperty() {}

FileInputProperty.prototype = new TextInputProperty();

FileInputProperty.prototype.bind = function() {
	this.getElement().on('change', function (e) {
		var selected = $(PiecesController.selected).data('piece');
		var property = $(e.target).data('property');
		property.submit(selected, e.target);
	});
}

FileInputProperty.prototype.submit = function(selected, element) {
	var val = element.files[0];
	var fr = new FileReader();
	$(fr).data('property', this);
	fr.onload = function() {
		var img = this.result;
		var property = $(this).data('property');
		selected = $(PiecesController.selected).data('piece');
		selected.properties[property.key] = img;
		property.trigger(selected);
	};

	fr.readAsDataURL(val);
	//selected.properties[this.key] = val;
	//this.trigger(selected);
}


FileInputProperty.prototype.evaluate = function(properties) {
	this.getElement().val('');
}