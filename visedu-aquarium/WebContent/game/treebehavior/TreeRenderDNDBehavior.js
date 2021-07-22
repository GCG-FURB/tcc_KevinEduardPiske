function TreeRenderDNDBehavior() {}

TreeRenderDNDBehavior.prototype = new TreeDNDBehavior();
TreeRenderDNDBehavior.prototype.removePiece = function(piece) {}

TreeRenderDNDBehavior.prototype.reloadPiece = function(piece, property) {
	VisEdu.reloadProperties(piece.properties);
}

TreeRenderDNDBehavior.prototype.addPiece = function(droppable, piece) {}