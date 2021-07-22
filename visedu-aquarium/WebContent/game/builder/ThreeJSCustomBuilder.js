/**
* Classe que representa um builder customizado.
*
* @author Kevin Eduard Piske
* @class ThreeJSCustomBuilder
* @constructor
*/
function ThreeJSCustomBuilder(){}

ThreeJSCustomBuilder.prototype = new ThreeJSBuilder();

ThreeJSCustomBuilder.createAquariumObject = function(piece) {
	var component = new AquariumRenderComponent().initialize(piece);
	var object = new AquariumObject().initialize(component, piece);
	return object;
}

ThreeJSCustomBuilder.createFishObject = function(piece) {
	var component = new FishRenderComponent().initialize(piece);
	var object = new FishObject().initialize(component, piece);
	return object;
}

ThreeJSCustomBuilder.createPanoramicBackgroundObject = function(size) {
	var component = new PanoramicBackgroundRenderComponent().initialize(size);
	var object = ThreeJSCustomBuilder.prototype.createTemplateObject(0, 0, 0, 0, 0, 0, component, "PANORAMIC_BACKGROUND_OBJECT");
	return object;
}