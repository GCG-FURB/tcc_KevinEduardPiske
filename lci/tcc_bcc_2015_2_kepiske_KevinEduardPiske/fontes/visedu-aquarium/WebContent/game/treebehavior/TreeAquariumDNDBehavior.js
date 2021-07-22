function TreeAquariumDNDBehavior() {}

TreeAquariumDNDBehavior.prototype = new TreeDNDBehavior();

TreeDNDBehavior.prototype.removePiece = function(piece) {
	var node = piece.htmlObject.next();
	$.each(node.find('>.connector >.element'), function(index, item) {
		var child = $(item).data('piece');
		child.type.treeBehavior.removePiece(child);
	}); 
	node.detach();
	
	var htmlObject = piece.htmlObject;
	var parentPiece = htmlObject.parent().parent().prev().data('piece')
	htmlObject.parent().removeClass('busy');
	htmlObject.detach();
	piece.type.graphicalBehavior.removePiece(piece, parentPiece);
}

TreeDNDBehavior.prototype.reloadPiece = function(piece, property) {
	var parent = piece.htmlObject.parent();
	var node = parent.find('> .object-node');
	node.detach();
	parent.append(node);
	piece.gameObject.updateProperty(property);
}

TreeDNDBehavior.prototype.addPiece = function(droppable, piece) {
	var htmlObject = piece.htmlObject;
	if (htmlObject && htmlObject.hasClass('element')) {
		this.removePiece(piece);
		droppable.droppable('disable');
	} else if (!piece.loading){
		piece = new piece.constructor().init();
		droppable.droppable('disable');
		var objectNode = $("<div class='object-node'>");
		objectNode.append(new ConnectorArrowPiece().init().createElement());
	}
	droppable.append(piece.createElement());
	if(objectNode) {
		droppable.append(objectNode);
	}
	DragAndDropController.setupDraggable(piece);

	droppable.addClass('busy');
	if (piece.type.graphicalBehavior) {
		piece.type.graphicalBehavior.addPiece(piece, $(droppable).parent()
				.prev().data('piece'));
	}
}