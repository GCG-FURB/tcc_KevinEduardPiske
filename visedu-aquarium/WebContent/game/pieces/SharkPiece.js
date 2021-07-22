function SharkPiece() {}

SharkPiece.prototype = new Piece();
SharkPiece.prototype.constructor = SharkPiece;
SharkPiece.prototype.$_setupProperties = SharkPiece.prototype._setupProperties;

SharkPiece.prototype.type = Types.typeShark;

SharkPiece.prototype.genGameObject = function() {
	return VisEdu.factory.createFish(this);
}

SharkPiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['obj'] = './resources/models/shark/shark_low_poly.obj';
	this.properties['mtl'] = './resources/models/shark/shark_low_poly.mtl';
	this.properties['moveSpeed'] = 0.3;
	this.properties['showVision'] = false;
	this.properties['visionRadius'] = 10;
	this.properties['visionRange'] = 30;
	this.properties['shouldEat'] = true;
	this.properties['showSynchronizedVision'] = false;
}
