function Piece() {}

Piece.prototype.htmlObject = null;
Piece.prototype.gameObject = null;
Piece.prototype.onDragBehavior = null;

Piece.prototype.properties = null;
Piece.prototype.loading;

Piece.prototype._setupProperties = function() {	
	if (this.type.name) {
		this.properties['name'] = this.type.name + ' ' + this.type.count;
	}
}

Piece.prototype.init = function() {
	this.properties = {'active':true};
	this._setupProperties();
	this.type.count++;
	this.loading = false;
	return this;
}

Piece.prototype.load = function(properties) {
	this.properties = properties;
	this.loading = true;
	this.type.count++;
	return this;
}

Piece.prototype.genElement = function(isTemplate) {
	var str = "<div class='piece resting ";
	var txt;
	var name = this.properties['name'];
	
	if (name) {		
		txt = "<div class='txt'>";
	}
	
	if (isTemplate) {
		str += "template ";
		if (txt) {
			txt += this.type.name;
		}
	} else {
		str += "element ";
		if (txt) {
			txt += name;
		}
	}
	
	str += this.type.clazz + " " + this.type.connector + 
		"' >";
	
	if (this.type.connector) {
		str +="<img/>";
	}
	
	if (txt) {
		str += txt + "</div>";
	}

	str += "</div>";	
	this.htmlObject = $(str).data('piece', this);	
	if (isTemplate) {
		this.onDragBehavior = new TemplateDNDBehavior();
	} else {
		this.onDragBehavior = new ElementDNDBehavior();
		this._addMouseEvent();
	}
	
	this.onDragBehavior.piece = this;
	return this.htmlObject;
}

Piece.prototype._addMouseEvent = function(evt) {
	this.htmlObject.mouseup(function(evt) {
		PiecesController.onPieceClicked(this);
	})
}

Piece.prototype.createTemplate = function() {
	return this.genElement(true);
}

Piece.prototype.createElement = function() {
	return this.genElement(false);
}

Piece.prototype.genGameObject = function() {}

Piece.prototype.getGameObject = function() {
	return this.gameObject = this.genGameObject();
}
