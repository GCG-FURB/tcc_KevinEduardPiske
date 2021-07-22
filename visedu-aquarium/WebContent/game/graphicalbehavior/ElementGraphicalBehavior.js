function ElementGraphicalBehavior() {
}

ElementGraphicalBehavior.prototype = new GraphicalBehavior();
ElementGraphicalBehavior.constructor = ElementGraphicalBehavior;

ElementGraphicalBehavior.prototype.removePiece = function(piece, parentPiece) {
	Game.apiHandler.removeGameObject(piece.gameObject, parentPiece.gameObject)
}

ElementGraphicalBehavior.prototype.reloadPiece = function(piece) {
	var parentPiece = piece.htmlObject.parent().parent().prev().data('piece');
	this.removePiece(piece, parentPiece);
	this.addPiece(piece, parentPiece);
}

ElementGraphicalBehavior.prototype.addPiece = function(piece, parentPiece) {
	var gameObject = piece.getGameObject();
	Game.apiHandler.addGameObject(gameObject, parentPiece.gameObject);
	gameObject.threeObject.visible = piece.properties['active'];
}