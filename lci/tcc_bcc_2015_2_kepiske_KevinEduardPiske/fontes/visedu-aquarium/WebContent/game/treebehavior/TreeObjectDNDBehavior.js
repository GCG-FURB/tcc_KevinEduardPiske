function TreeObjectDNDBehavior() {}

TreeObjectDNDBehavior.prototype = new TreePluralDNDBehavior();
TreeObjectDNDBehavior.prototype.$addPiecePlural = TreeObjectDNDBehavior.prototype.addPiece;
TreeObjectDNDBehavior.prototype.$reloadPiecePlural = TreeObjectDNDBehavior.prototype.reloadPiece;
TreeObjectDNDBehavior.prototype.$removePiecePlural = TreeObjectDNDBehavior.prototype.removePiece;

TreeObjectDNDBehavior.prototype.reallocating;

TreeObjectDNDBehavior.prototype.removePiece = function(piece) {
	var node = piece.htmlObject.next();
	if (!this.reallocating) {
		$.each(node.find('>.connector >.element'), function(index, item) {
			var child = $(item).data('piece');
			child.type.treeBehavior.removePiece(child);
		}); 
	}
	node.detach();
	this.$removePiecePlural(piece);
}

TreeObjectDNDBehavior.prototype.reloadPiece = function(piece, property) {
	this.$reloadPiecePlural(piece, property)
	var parent = piece.htmlObject.parent();
	var node = parent.find('> .object-node');
	node.detach();
	parent.append(node);
}

TreeObjectDNDBehavior.prototype.addPiece = function(droppable, piece) {
	var htmlObject = piece.htmlObject;
	if (htmlObject && htmlObject.hasClass('element')) {
		this.reallocating = true;
		var objectNode = htmlObject.next();
	} else {
		var objectNode = $("<div class='object-node'>");
		objectNode 
		.append(new ConnectorSquarePiece().init().createElement())
		.append($('<br/>'))
		.append(new ConnectorDiamondPiece().init().createElement())
		.append($('<br/>'))		
		.append(new ConnectorArrowPiece().init().createElement())
		;				
	}
	this.$addPiecePlural.call(this, droppable, piece);
	droppable.append(objectNode);
	if (this.reallocating) {
		$.each(objectNode.find('>.connector >.element'), function(index, item) {
			var child = $(item).data('piece');
			child.type.graphicalBehavior.addPiece(child, piece);
		});
		this.reallocating = false;		
	}
}