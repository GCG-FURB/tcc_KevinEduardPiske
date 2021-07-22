function DNDBehavior() {}

DNDBehavior.prototype.piece = null;

DNDBehavior.prototype.helper = '';
DNDBehavior.prototype.containment = '';

DNDBehavior.prototype.start = function () {
	DragAndDropController.setupDroppables(this.piece);
}

DNDBehavior.prototype.stop = function () {
	DragAndDropController.disableDroppables(this.piece);
}		
