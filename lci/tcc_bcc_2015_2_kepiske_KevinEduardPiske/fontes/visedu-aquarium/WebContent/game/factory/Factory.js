function Factory() {}

Factory.prototype.createGraphicObject = function(piece) {
	var object = ThreeJSBuilder.createGroupObject();
	object.threeObject.matrixAutoUpdate = false;
	return object;
}

Factory.prototype.createCube = function() {}

Factory.prototype.createPolygon = function(piece) {
	var primitive = piece.properties['primitive'];
	var object;
	switch(primitive) {
		case 'vertex':
			object = this.createVertices(piece);
			break;
		case 'open':
			object = this.createLinesPolygon(piece);
			break;
		case 'closed':
			object = this.createLineLoopPolygon(piece); 
			break;
		case 'filled':
			object = this.createFilledPolygon(piece);
			break;
	}
	return object;
}
/*
Factory.prototype.createSpheres = function(piece) {}
Factory.prototype.createFilledPolygon = function(piece) {}
Factory.prototype.createLineLoopPolygon = function(piece) {}
Factory.prototype.createLinesPolygon = function(piece) {}
*/
Factory.prototype.createCamera = function(piece) {}

Factory.prototype.createSpline = function(piece) {
	return ThreeJSBuilder.createSplineObject(0, 0, 0,
			this.convert([
				piece.properties['p1'],
				piece.properties['p2'],
				piece.properties['p3'],
				piece.properties['p4']
				]),
			piece.properties['numPoints'],
			piece.properties['color'], 
			piece.properties['polyhedron_enable'],
			piece.properties['polyhedron_color']);
}

Factory.prototype.createTranslate = function(piece) {}

Factory.prototype.createRotate = function(piece) {}

Factory.prototype.createScale = function(piece) {}

Factory.prototype.createLight = function(piece) {
	var type = piece.properties['typeIndex'];
	var light;
	var properties = piece.properties;
	switch(type) {
		case '0':
			light = this.createAmbientLight(properties );
			break;
		case '1':
			light = this.createHemisphereLight(properties );
			break;
		case '2':
			light = this.createDirectionalLight(properties );
			break;
		case '3':
			light = this.createPointLight(properties );
			break;
		case '4':
			light = this.createSpotLight(properties );
			break;
		}
	return light;
}

Factory.prototype.createAmbientLight = function(properties) {
	var light = ThreeJSBuilder.createAmbientLightObject(
			properties['color']
			);
	return light;
}

Factory.prototype.createHemisphereLight = function(properties) {
	var light = ThreeJSBuilder.createHemisphereLightObject(
			properties['x'],
			properties['y'],
			properties['z'],
			properties['color'],
			properties['background'],
			properties['intensity']			
	);
	light.component.genHelper(10);
	return light;
}

Factory.prototype.createDirectionalLight = function(properties) {
	var light = ThreeJSBuilder.createDirectionalLightObject(
			properties['x'],
			properties['y'],
			properties['z'],
			properties['target_x'],
			properties['target_y'],
			properties['target_z'],
			properties['color'],
			properties['intensity']			
	);
	light.component.genHelper(20);
	return light;
}

Factory.prototype.createPointLight = function(properties) {
	var light = ThreeJSBuilder.createPointLightObject(
			properties['x'],
			properties['y'],
			properties['z'],
			properties['color'],
			properties['intensity'],			
			properties['distance']		
	);
	light.component.genHelper(20);
	return light;
}

Factory.prototype.createSpotLight = function(properties) {
	var light = ThreeJSBuilder.createSpotLightObject(
			properties['x'],
			properties['y'],
			properties['z'],
			properties['target_x'],
			properties['target_y'],
			properties['target_z'],
			properties['color'],
			properties['intensity'],		
			properties['distance'],	
			properties['angle'],	
			properties['exponent']
	);
	light.component.genHelper(10);
	return light;
}

Factory.prototype.createLinesPolygon = function(piece) {
	return ThreeJSBuilder.createLinesObject(
			0, 0, 0,
			this.convert(piece.properties['points']),
			piece.properties['color']);	
}

Factory.prototype.createLineLoopPolygon = function(piece) {
	return Game.objectFactory.getPolygonObject(
			new THREE.Vector3(0, 0, 0),
			this.convert(piece.properties['points']), null,
			null, piece.properties['color']);	
}

Factory.prototype.createFilledPolygon = function(piece) {
	return Game.objectFactory.getPolygonObject(
			new THREE.Vector3(0, 0, 0),
			this.convert(piece.properties['points']), null,
			piece.properties['color'], null);
}

Factory.prototype.convert= function(points) {
	var vec = [];
	var factory = this;
	$.each(points, function(index, item) {
		vec.push(new THREE.Vector3(item.x, item.y, factory.checkZ(item.z)));
	});
	return vec;
}

Factory.prototype.checkZ = function(z) {return z}

Factory.prototype.checkVector = function(vector) {}

Factory.prototype.checkVectorRotate = function(vector) {}