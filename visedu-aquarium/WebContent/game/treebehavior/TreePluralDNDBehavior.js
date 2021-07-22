function TreePluralDNDBehavior() {}

TreePluralDNDBehavior.prototype = new TreeDNDBehavior();
TreePluralDNDBehavior.prototype.$addPiece = TreePluralDNDBehavior.prototype.addPiece;
TreePluralDNDBehavior.prototype.$reloadPiece = TreePluralDNDBehavior.prototype.reloadPiece;
TreePluralDNDBehavior.prototype.$removePiece = TreePluralDNDBehavior.prototype.removePiece;

TreePluralDNDBehavior.prototype.removePiece = function(piece) {
	if(piece.gameObject == Game.apiHandler.selectedFish) {
		PiecesController.tab.tabs("option", "active", 0); // Foca na aba fábrica de peças
	}
	
	// Remove a peça da árvore
	var parent = piece.htmlObject.parent();
	this.$removePiece(piece);
	parent.next().detach();
	parent.detach();
	
	// Decrementa contador de peixes
	if(piece.type.name === "Sardinha") {
		this.changeFishCounter('quantitySardine', -1);
	} else {
		this.changeFishCounter('quantityShark', -1);
	}
	this.changeFishCounter('quantityFish', -1);
	
	delete Game.apiHandler.getObjectsMap()[piece.gameObject.name];
}

TreePluralDNDBehavior.prototype.reloadPiece = function(piece, property) {
	piece.gameObject.updateProperty(property);
}

TreePluralDNDBehavior.prototype.addPiece = function(droppable, piece) {
	this.$addPiece(droppable, piece);

	var constructor = droppable.data('piece').constructor;
	var newConnector = new constructor().init();
	droppable.after(newConnector.createElement()).after($('<br/>'));
	
	// Incrementa contador de peixes
	if(piece.type.name === "Sardinha") {
		this.changeFishCounter('quantitySardine', 1);
	} else {
		this.changeFishCounter('quantityShark', 1);
	}
	this.changeFishCounter('quantityFish', 1);
}

TreePluralDNDBehavior.prototype.changeFishCounter = function(labelID, value) {
	var label = document.getElementById(labelID);
	var quantityString = label.innerHTML;
	var quantity = Number(quantityString);
	label.innerHTML = quantity + value;
	if(labelID == "quantitySardine") {
		Game.apiHandler.sardineCount = quantity + value;
	} else {
		if(labelID == "quantityShark") {
			Game.apiHandler.sharkCount = quantity + value;
		}
	}
}