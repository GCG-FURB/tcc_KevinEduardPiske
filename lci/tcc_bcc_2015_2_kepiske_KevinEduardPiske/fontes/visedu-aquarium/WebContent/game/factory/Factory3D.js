function Factory3D() {}

Factory3D.prototype =  new Factory();
Factory3D.prototype.constructor = Factory3D.prototype; 

Factory3D.prototype.createCube = function(piece) {
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
	
	return ThreeJSCustomBuilder.createCubeObject(
			piece.properties['x'], piece.properties['y'], piece.properties['z'], 
			piece.properties['width'], piece.properties['height'], piece.properties['depth'], 
			color, null, texture);
}

Factory3D.prototype.createFish = function(piece) {
	return ThreeJSCustomBuilder.createFishObject(piece);
}

Factory3D.prototype.createAquarium = function(piece) {
	return ThreeJSCustomBuilder.createAquariumObject(piece);
}

Factory3D.prototype.createPanoramicBackground = function(size) {
	return ThreeJSCustomBuilder.createPanoramicBackgroundObject(size);
}

Factory3D.prototype.createVertices = function(piece) {
	return ThreeJSCustomBuilder.createSpheresObject(
			0, 0, 0,
			this.convert(piece.properties['points']),
			piece.properties['color'], 5);
}

Factory3D.prototype.createCamera = function(piece) {
	var camera = ThreeJSBuilder.createCameraObject(
			piece.properties['x'],
			piece.properties['y'],
			piece.properties['z'],
			VisEdu.aspect,
			piece.properties['fov'],
			piece.properties['near'], 
			piece.properties['far']
			);
	camera.component.genHelper();
	var lookat = new THREE.Vector3(
			piece.properties['x_lookat'],
			piece.properties['y_lookat'],
			piece.properties['z_lookat']);

	camera.threeObject.lookAt(lookat);
	return camera;
}

Factory3D.prototype.checkVector = function(vector) {
	return vector;
}

Factory3D.prototype.checkVectorRotate = function(vector) {
	return vector;
}