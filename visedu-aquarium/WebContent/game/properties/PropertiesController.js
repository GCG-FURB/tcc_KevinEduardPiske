var PropertiesController = new function() {
	
	this.wrappers = [];
	
	this.bindProperties = function() {
		var visionCheck = new CheckBoxProperty().init('check', 'vision', 'showVision', false, true);
		visionCheck.bind();
		
		var visionRadius = new NumberInputProperty().init('visionRadius', 'visionSize', 'visionRadius', false, true);
		visionRadius.bind();
		
		var visionRange = new NumberInputProperty().init('visionRange', 'visionSize', 'visionRange', false, true);
		visionRange.bind();
		
		var moveSpeed = new NumberInputProperty().init('moveSpeed', 'moveSpeed', 'moveSpeed', false, true);
		moveSpeed.bind();
		
		var eatCheck = new CheckBoxProperty().init('check', 'shouldEat', 'shouldEat', false, true);
		eatCheck.bind();
		
		var moveSpeed = new NumberInputProperty().init('speedMultiplier', 'multiplier', 'speedMultiplier', false, true);
		moveSpeed.bind();
		
		var visionSynchronized = new CheckBoxProperty().init('check', 'synchronizedVision', 'showSynchronizedVision', false, true);
		visionSynchronized.bind();
		
		var perceptionChech = new CheckBoxProperty().init('check', 'perception', 'perception', false, true);
		perceptionChech.bind();
	}
	
	this.setupProperties = function() {
		var selected = PiecesController.selected;
		var piece = $(selected).data('piece');
		if (selected) {
			var properties = piece.properties;
			var fields = $('.property.'+piece.type.id);
			this.showProperties(fields);
			$.each(fields, function(index, item) {
				$.each($(item).find('.prop-field'), function(index, field) {
					$(field).data("property").checkEvaluate(item, properties);					
				});
			});
			$.each(PropertiesController.wrappers, function(index, item) {
				item.check(properties);
			});
		} else {
			this.hideProperties();
		}
		PropertiesController.check3DProperties();
	}
	
	this.hideProperties = function() {
		$('.property').hide()
		$('.property.none').show();		
	}
	
	this.showProperties = function(properties) {
		$('.property').hide();
		properties.show();		
	}
	
	this.check3DProperties = function () {
		if (VisEdu.mode === '2D') {
			PropertiesController.hide3DProperties();	
		}
	}
	

	this.hide3DProperties = function() {
		$('.3d:visible').hide();
	}	
}