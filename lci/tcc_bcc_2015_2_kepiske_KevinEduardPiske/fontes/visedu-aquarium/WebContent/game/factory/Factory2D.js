function Factory2D() {}

Factory2D.prototype =  new Factory();
Factory2D.prototype.constructor = Factory2D.prototype; 

Factory2D.prototype.createCube = function(piece) { 
	var texture = '';
	var color = '';
	if (piece.properties['enableTexture']) {
		var list = piece.properties['listTextureImage'];
		var file = piece.properties['textureFile']
		if (list) {
			texture = list;
		} else if (file) {
			texture = file;
		}
	} 
	if (texture) {
		color = 0xFFFFFF;		
	} else {
		color = piece.properties['color'];
	}
	
	return ThreeJSBuilder.createSquareObject(piece.properties['x'], piece.properties['y'], piece.properties['z'], 
			piece.properties['width'], piece.properties['height'], color, null, texture);
}

Factory2D.prototype.createCamera = function(piece) {
	var camera = ThreeJSBuilder.createCameraObject(
			0, 0, 
			piece.properties['z'],
			VisEdu.aspect,
			piece.properties['fov'],
			piece.properties['near'], 
			piece.properties['far']
			);
	camera.component.genHelper();
	return camera;
}

Factory2D.prototype.checkZ= function(z) {
		return 0;
}

Factory2D.prototype.createVertices = function(piece) {
	return ThreeJSBuilder.createCirclesObject(
			0, 0, 0,
			this.convert(piece.properties['points']),
			piece.properties['color'], 5);
	
}

Factory2D.prototype.checkVector = function(vector) {
	return new THREE.Vector3(vector.x, vector.y, 0);
}

Factory2D.prototype.checkVectorRotate = function(vector) {
	return new THREE.Vector3(0, 0, vector.z);
}