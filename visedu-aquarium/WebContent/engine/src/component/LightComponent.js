/**
* Component que renderiza um cubo.
*
* @author William FK
* @class BoxRenderComponent
* @constructor
*/
function LightComponent(){}

LightComponent.prototype = new RenderableComponent();

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
LightComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author William FK
* @method getTag
* @return {String} tag
*/
LightComponent.prototype.getTag = function() {
	return "LIGHT_COMPONENT";
}

LightComponent.prototype.genHelper = function() {}