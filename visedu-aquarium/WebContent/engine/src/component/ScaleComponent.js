/**
* Component que aplica uma escala no objeto associado.
*
* @author Marcos Harbs
* @class ScaleComponent
* @constructor
*/
function ScaleComponent(){}

ScaleComponent.prototype = new TransformationComponent();

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
ScaleComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
ScaleComponent.prototype.getTag = function(){
	return "SCALE_COMPONENT";
}