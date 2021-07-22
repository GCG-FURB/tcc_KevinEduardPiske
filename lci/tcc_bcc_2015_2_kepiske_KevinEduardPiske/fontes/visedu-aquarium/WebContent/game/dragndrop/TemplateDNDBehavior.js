function TemplateDNDBehavior() {}

TemplateDNDBehavior.prototype = new DNDBehavior();

TemplateDNDBehavior.prototype.helper = 'clone';
TemplateDNDBehavior.prototype.containment = '.menu';

TemplateDNDBehavior.prototype.revert = function (event, ui) {
	this.piece.htmlObject.data('ui-draggable').originalPosition = this.piece.htmlObject.position();					
	return !event;
}