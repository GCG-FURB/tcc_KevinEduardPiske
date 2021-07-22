function ThreeJSComponentFactory() {}

ThreeJSComponentFactory.prototype.getRotateComponent = function() {
	return new ThreeJSRotateComponent().initialize(new THREE.Vector3(0, 0, 0));
}

ThreeJSComponentFactory.prototype.getScaleComponent = function() {
	return new ThreeJSScaleComponent().initialize(new THREE.Vector3(1, 1, 1));
}

ThreeJSComponentFactory.prototype.getTranslateComponent = function() {
	return new ThreeJSTranslateComponent().initialize(new THREE.Vector3(0, 0, 0));
}