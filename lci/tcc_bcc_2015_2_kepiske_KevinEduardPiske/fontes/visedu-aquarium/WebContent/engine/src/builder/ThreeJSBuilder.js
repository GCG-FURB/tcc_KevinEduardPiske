function ThreeJSBuilder() {}


ThreeJSBuilder.prototype.createTemplateObject = function(x, y, z, width, height, depth, component, tag) {
	var object = new TemplateObject().initialize(x, y, z, width, height, depth, component, tag);
	return object;
}	

ThreeJSBuilder.createGroupObject = function() {
	var component = new GroupComponent().initialize();
	var object = ThreeJSBuilder.prototype.createTemplateObject(0, 0, 0, 0, 0, 0, component, "GROUP_OBJECT");
	return object;
}

ThreeJSBuilder.createSquareObject = function(x, y, z, width, height, fillstyle, strokeStyle, texture) {
	var component = new BoxRenderComponent().initialize(fillstyle, strokeStyle, texture);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, width, height, 0, component, "SQUARE_OBJECT");
	return object;
}

ThreeJSBuilder.createCubeObject = function(x, y, z, width, height, depth, fillstyle, strokeStyle, texture) {
	var component = new CubeRenderComponent().initialize(fillstyle, strokeStyle, texture);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, width, height, depth, component, "CUBE_OBJECT");
	return object;
}

ThreeJSBuilder.createPolygonObject = function(x, y, z, points, faces, fillstyle, strokeStyle) {
	var component = new PolygonRenderComponent().initialize(fillstyle, strokeStyle);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, 0, 0, 0, component, "POLYGON_OBJECT");
	object.faces = faces;
	object.points = points;
	return object;
}

ThreeJSBuilder.createLinesObject = function(x, y, z, points, fillstyle) {
	var component = new LinesRenderComponent().initialize(fillstyle);
	var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "LINES_OBJECT");
	return object;
}

ThreeJSBuilder.createSpheresObject = function(x, y, z, points, fillStyle, radius) {
	var component = new SpheresRenderComponent().initialize(fillStyle, radius);
	var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "SPHERES_OBJECT");
	return object;
}

ThreeJSBuilder.createCirclesObject = function(x, y, z, points, fillStyle, radius) {
	var component = new CirclesRenderComponent().initialize(fillStyle, radius);
	var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "CIRCLES_OBJECT");
	return object;
}

ThreeJSBuilder.createSplineObject = function(x, y, z, points, numPoints, color, enablePolyhedron, polyhedronColor) {
	var component = new SplineRenderComponent().initialize(numPoints, color, enablePolyhedron, polyhedronColor);
	var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "SPLINE_OBJECT");
	return object;
}

ThreeJSBuilder.createAmbientLightObject = function(color) {
	var component = new AmbientLightComponent().initialize(color);
	var object = ThreeJSBuilder.prototype.createTemplateObject(0, 0, 0, 0, 0, 0, component, "AMBIENT_LIGHT_OBJECT");
	return object;
}

ThreeJSBuilder.createHemisphereLightObject = function(x, y, z, color, background, intensity) {
	var component = new HemisphereLightComponent().initialize(color, background, intensity);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, 0, 0, 0, component, "HEMISPHERE_LIGHT_OBJECT");
	return object;
}

ThreeJSBuilder.createDirectionalLightObject = function(x, y, z, target_x, target_y, target_z, color, intensity) {
	var component = new DirectionalLightComponent().initialize(target_x, target_y, target_z, color, intensity);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, 0, 0, 0, component, "DIRECTIONAL_LIGHT_OBJECT");
	return object;
}

ThreeJSBuilder.createPointLightObject = function(x, y, z, color, intensity, distance) {
	var component = new PointLightComponent().initialize(color, intensity, distance);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, 0, 0, 0, component, "POINT_LIGHT_OBJECT");
	return object;
}

ThreeJSBuilder.createSpotLightObject = function(x, y, z, target_x, target_y, target_z, color, intensity, distance, angle, exponent) {
	var component = new SpotLightComponent().initialize(target_x, target_y, target_z, color, intensity, distance, angle, exponent);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, 0, 0, 0, component, "SPOT_LIGHT_OBJECT");
	return object;
}

ThreeJSBuilder.createAnimationObject = function(x, y, z, width, height, spriteSheet, columns, rows) {
	var component = new AnimationRenderComponent().initialize(spriteSheet, columns, rows);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, width, height, 0, component, "ANIMATION_OBJECT");
	return object;
}

ThreeJSBuilder.createGridObject = function(x, y, z, width, steps) {
	var component = new GridRenderComponent().initialize(steps);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, width, width, width, component, "GRID_OBJECT");
	return object;
}

ThreeJSBuilder.createCameraObject = function(x, y, z, aspect, fov, near, far) {
	var component = new CameraComponent().initialize(aspect, fov, near, far);
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, 0, 0, 0, component, "CAMERA_OBJECT");
	return object;
}

ThreeJSBuilder.createAxisObject = function(x, y, z, width) {
	var component = new AxisRenderComponent().initialize();
	var object = ThreeJSBuilder.prototype.createTemplateObject(x, y, z, width, width, width, component, "AXIS_OBJECT_OBJECT");
	return object;
}

