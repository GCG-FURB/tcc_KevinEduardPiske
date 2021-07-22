var DragAndDropController = new function() {
	
	this.setupDraggable = function(piece) {
		var Behavior = piece.onDragBehavior;
		$(piece.htmlObject).draggable(
				{
					helper: Behavior.helper,
					start: function () {
						Behavior.start();
						piece.htmlObject.addClass('dragged');
					},
					stop: function () {
						Behavior.stop();
						piece.htmlObject.removeClass('dragged');
					},
					revert: function(event, ui) {
						return Behavior.revert(event, ui);
					},
					containment: Behavior.containment
				}
			);
	}
	
	this.setupDroppables = function(piece) {
		var count = 0;
		$('.' + piece.type.connector + '.connector:not(.busy)').droppable(
			{
				disabled: false,			
				tolerance: 'touch',			
				drop: function(ev, ui) {
					if (count++ < 1) { //caso largue entre 2 objectos
						piece.type.treeBehavior.addPiece($(this), piece);
						DragAndDropController.fitTree();
					}				
			}
		});
	}
	
	this.disableDroppables = function(piece) {
		$('.' + piece.type.connector + '.connector.ui-droppable').droppable('disable');
	}
	
	this.setupDroppableTrash = function(piece) {
		var count = 0;
		$('.trashCan').droppable(
			{
				disabled: false,			
				tolerance: 'touch',			
				drop: function(ev, ui) {
					if (count++ < 1) { //caso largue entre 2 objectos
						piece.type.treeBehavior.removePiece(piece);
						DragAndDropController.fitTree();
					}				
				}
		});
	}
	
	this.fitTree = function() {
		var totalHeight = 0;
		var tree = $('.pieces-tree'); 
		tree.children().each(function(){
		    totalHeight = totalHeight + $(this).outerHeight();
		});
		tree.height(totalHeight);
	}
}