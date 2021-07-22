/**
* Component que aplica uma translação no objeto associado.
*
* @author Marcos Harbs
* @class TranslateComponent
* @constructor
*/
function TranslateComponent(){}

TranslateComponent.prototype = new TransformationComponent();


/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
TranslateComponent.prototype.getSystems = function(){
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
TranslateComponent.prototype.getTag = function(){
	return "TRANSLATE_COMPONENT";
}