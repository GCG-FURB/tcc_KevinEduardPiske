function SardinePiece() {}

SardinePiece.prototype = new Piece();
SardinePiece.prototype.constructor = SardinePiece;
SardinePiece.prototype.$_setupProperties = SardinePiece.prototype._setupProperties;

SardinePiece.prototype.type = Types.typeSardine;

SardinePiece.prototype.genGameObject = function() {
	return VisEdu.factory.createFish(this);
}

SardinePiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['obj'] = './resources/models/sardine/sardine.obj';
	this.properties['mtl'] = './resources/models/sardine/sardine.mtl';
	this.properties['moveSpeed'] = 0.6;
	this.properties['showVision'] = false;
	this.properties['visionRadius'] = 10;
	this.properties['visionRange'] = 30;
	this.properties['showSynchronizedVision'] = false;
}
