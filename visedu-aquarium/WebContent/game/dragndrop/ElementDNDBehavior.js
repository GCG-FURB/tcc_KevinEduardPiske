function ElementDNDBehavior() {
}

ElementDNDBehavior.prototype = new DNDBehavior();
ElementDNDBehavior.prototype.$_start = ElementDNDBehavior.prototype.start;

ElementDNDBehavior.prototype.helper = 'original';
ElementDNDBehavior.prototype.containment = 'pieces-tree';

ElementDNDBehavior.prototype.start = function() {
	this.$_start();
	DragAndDropController.setupDroppableTrash(this.piece);	
}

ElementDNDBehavior.prototype.revert = function(event, ui) {
	this.piece.htmlObject.data('ui-draggable').originalPosition = {
		top : 0,
		left : 0
	};
	return !event;
}