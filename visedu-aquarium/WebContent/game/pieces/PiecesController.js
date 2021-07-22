var PiecesController = new function () {
	
	this.tab = null;
	
	this.setupDraggables = function() {
		$.each($('.template'), function(index, item) {
			DragAndDropController.setupDraggable($(item).data('piece'));
		})
	}
	
	this.createPallet = function(container) {
		// Monta fábrica de peças
		new AquariumPiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		container.append('<br/>');
		new SharkPiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		new SardinePiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
	}
	
	this.onPieceClicked = function(htmlPiece) {
		if (this.checkNotDragged(htmlPiece)) {			
			if (this.selected) {
				$(this.selected).removeClass("selected").addClass("resting");
			}
			if (this.selected == htmlPiece) {
				this.selected = null
			} else {
				$(htmlPiece).addClass('selected').removeClass("resting");
				this.selected = htmlPiece;
				if (this.tab) {
					this.tab.tabs("option", "active", 1);
				}
			}
			
			if(this.selected == null) {
				Game.apiHandler.auxCamera = null;
				Game.apiHandler.selectedFish = null;
				$('#messages-area').val('');
			} else {
				// Verifica se a peça representa um peixe
				if($(htmlPiece).hasClass('fish')) {
					var objectsMap = Game.apiHandler.getObjectsMap();
					var selectedFish = objectsMap[htmlPiece.innerText];
					Game.apiHandler.auxCamera = selectedFish.camera;
					Game.apiHandler.selectedFish = selectedFish;
					$('#messages-area').val(selectedFish.reasonerMessages);
					var textarea = document.getElementById('messages-area');
					textarea.scrollTop = textarea.scrollHeight;
				} else {
					Game.apiHandler.auxCamera = null;
					Game.apiHandler.selectedFish = null;
					$('#messages-area').val('');
				}
			}
			
			PropertiesController.setupProperties();
		}
	}
	
	this.checkNotDragged = function(htmlPiece) {
		return $(htmlPiece).hasClass('renderer') ||
			($(htmlPiece).css('top') == '0px' && $(htmlPiece).css('left') == '0px');
	}
	
	this.createTree = function(tree) {
		// Monta árvore de peças
		var worldPiece = new WorldPiece().init();
		worldPiece.createElement().appendTo(tree);
		worldPiece.getGameObject();
		var node = $("<div class='object-node'></div>").appendTo(tree);
		new ConnectorCrossPiece().init().createElement().appendTo(node);
		Game.apiHandler.properties = worldPiece.properties;
	}
	
	this.fitPiece = function(piece) {
		var pieceElement = piece.htmlObject;
		pieceElement.parent().height(pieceElement.outerHeight()).width(pieceElement.outerWidth());
	}
	
	this.selected = null;

}