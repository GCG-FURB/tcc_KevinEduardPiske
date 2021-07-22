var PiecesUtils = new function() {
	
	this.genJSON = function(root) {
		return JSON.stringify(PiecesUtils._parsePiece(root));
	}
	
	this._parsePiece = function(pieceEl) {
		var piece = pieceEl.data('piece');
		var object= {
			'name' : piece.constructor.name,
			'properties' : piece.properties,
			'children' : {}
		}
		
		$.each(pieceEl.next().find('>.connector>.element'), function(index, item) {
			object.children[index] = (PiecesUtils._parsePiece($(item)));
		});
		return object;
	}
	
	this.findConnector = function(piece, node) {
		return node.find('>.connector:not(.busy).'+piece.type.connector);
	}
	
	this._loadPiece = function(object, node) {
		var piece = new window[object.name]().load(object.properties);
		piece.type.treeBehavior.addPiece(PiecesUtils.findConnector(piece, node), piece);
		var node = piece.htmlObject.next('.object-node')
		$.each(object.children, function(index, item) {
			PiecesUtils._loadPiece(item, node);
		});
		piece.loading = false;
	}
	
	this.readJSON = function(rootEl, text) {
		this.removePieces();
		var piece = rootEl.data('piece');
		var object = JSON.parse(text);
		piece.load(object.properties);
		var node = rootEl.next('.object-node');
		$.each(object.children, function(index, item) {
			PiecesUtils._loadPiece(item, node);
		});
		piece.loading = false;
	}
	
	this.removePieces = function() {
		/* busca todas as peças encaixadas no nível 0 */
		var objects = $('.piece.renderer+.object-node').find('>.connector.busy>.piece');
		$.each(objects, function(index, item) {
			var piece = $(item).data('piece');
			piece.type.treeBehavior.removePiece(piece);
		});
	}
}