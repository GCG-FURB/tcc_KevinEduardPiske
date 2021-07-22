function WorldPiece() {}

WorldPiece.prototype = new Piece();
WorldPiece.prototype.constructor = WorldPiece;
WorldPiece.prototype.$setupProperties = WorldPiece.prototype._setupProperties;
WorldPiece.prototype.$load = WorldPiece.prototype.load;

WorldPiece.prototype.type = Types.typeRenderer;


WorldPiece.prototype._setupProperties = function() {
	this.properties['name'] = this.type.name;
	this.properties['speedMultiplier'] = 1;
	this.update();
}

WorldPiece.prototype.load = function(properties) {
	this.$load(properties);
	this.update();
	return this;
}

WorldPiece.prototype.update = function() {
	VisEdu.reloadProperties(this.properties);
}

WorldPiece.prototype.genGameObject = function() {
	return VisEdu.root;
}
