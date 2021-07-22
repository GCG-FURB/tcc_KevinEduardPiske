function AquariumPiece() {}

AquariumPiece.prototype = new Piece();
AquariumPiece.prototype.constructor = AquariumPiece;
AquariumPiece.prototype.$setupProperties = AquariumPiece.prototype._setupProperties;
AquariumPiece.prototype.$load = AquariumPiece.prototype.load;

AquariumPiece.prototype.type = Types.typeAquarium;

AquariumPiece.prototype.genGameObject = function() {
	return VisEdu.factory.createAquarium(this);
}

AquariumPiece.prototype._setupProperties = function() {
	this.properties['name'] = this.type.name;
	this.properties['diameter'] = 100;
	this.properties['perception'] = true;
}