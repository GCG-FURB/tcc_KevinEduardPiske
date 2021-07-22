/**
* Component que renderiza um cubo.
*
* @author William FK
* @class BoxRenderComponent
* @constructor
*/
function AxisRenderComponent(){}

AxisRenderComponent.prototype = new RenderableComponent();

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
AxisRenderComponent.prototype.getSystems = function(){
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
AxisRenderComponent.prototype.getTag = function(){
	return "AXIS_RENDER_COMPONENT";
}

AxisRenderComponent.prototype.genThreeObject = function(){
	//var material = Game.apiHandler.getBasicMaterial(this.fillStyle);
	var grid = new THREE.AxisHelper(this.owner.width);
	return grid;
}