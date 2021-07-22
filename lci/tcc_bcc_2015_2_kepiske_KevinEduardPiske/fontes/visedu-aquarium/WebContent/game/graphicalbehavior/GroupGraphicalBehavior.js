function GroupGraphicalBehavior() {}

GroupGraphicalBehavior.prototype = new ElementGraphicalBehavior();
GroupGraphicalBehavior.prototype.$_addPiece = GroupGraphicalBehavior.prototype.addPiece;
GroupGraphicalBehavior.constructor = GroupGraphicalBehavior;

GroupGraphicalBehavior.prototype.removePiece = function(piece, parentPiece) {
	Game.apiHandler.removeGameObject(piece.gameObject, parentPiece.gameObject);
}

GroupGraphicalBehavior.prototype.reloadPiece = function(piece) {
	var parentPiece = piece.htmlObject.parent().parent().prev().data('piece');
	var layer = parentPiece.gameObject;
	var children = piece.gameObject.threeObject.children;
	Game.apiHandler.removeGameObject(piece.gameObject, layer)
	this.addPiece(piece, parentPiece);
	if (children && children.length){
		$.each(children, function(index, item) {
			piece.gameObject.threeObject.add(item);			
		});
	}
	this.transform(piece);
}

GroupGraphicalBehavior.prototype.addPiece = function(piece, parentPiece) {
	this.$_addPiece(piece, parentPiece);
	//var gameObject = piece.getGameObject();
	//Game.apiHandler.addGameObject(gameObject, parentPiece.gameObject);
	this.transform(piece);
}

GroupGraphicalBehavior.prototype.reload = function(piece) {
	var object = piece.gameObject.threeObject;
	object.matrix.identity();
}

GroupGraphicalBehavior.prototype.transform = function(piece) {
	var transformPieces = piece.htmlObject.next().find('> .connector > .transform');
	$.each(transformPieces.get().reverse(), function(index, item) {
		var transformPiece = $(item).data('piece');
		transformPiece.type.graphicalBehavior.apply(transformPiece, piece);
	});
	piece.properties['matrix'] = piece.gameObject.threeObject.matrix.elements;
}