function TreeDNDBehavior() {
}

TreeDNDBehavior.prototype.removePiece = function(piece) {
	var htmlObject = piece.htmlObject;
	var parentPiece = htmlObject.parent().parent().prev().data('piece')
	htmlObject.parent().removeClass('busy');
	htmlObject.detach();
	piece.type.graphicalBehavior.removePiece(piece, parentPiece);
}

TreeDNDBehavior.prototype.reloadPiece = function(piece, property) {
	if (property.reloadTree) {
		this.addPieceTreeObject(piece.htmlObject.parent(), piece);
		PiecesController.onPieceClicked(piece.htmlObject[0]);
	}
	if (property.reloadScene && piece.type.graphicalBehavior) {
		piece.type.graphicalBehavior.reloadPiece(piece);
	}
}

TreeDNDBehavior.prototype.addPieceTreeObject = function(droppable, piece) {
	var htmlObject = piece.htmlObject;
	htmlObject.detach();
	droppable.append(piece.createElement());
	DragAndDropController.setupDraggable(piece);

	droppable.addClass('busy');
}

TreeDNDBehavior.prototype.addPiece = function(droppable, piece) {
	var htmlObject = piece.htmlObject;
	if (htmlObject && htmlObject.hasClass('element')) {
		this.removePiece(piece);
		droppable.droppable('disable');
	} else if (!piece.loading){
		piece = new piece.constructor().init();
		droppable.droppable('disable');
	}
	droppable.append(piece.createElement());
	DragAndDropController.setupDraggable(piece);

	droppable.addClass('busy');
	if (piece.type.graphicalBehavior) {
		piece.type.graphicalBehavior.addPiece(piece, $(droppable).parent()
				.prev().data('piece'));
	}
}