/**
* Component que renderiza um cubo.
*
* @author William FK
* @class BoxRenderComponent
* @constructor
*/
function GroupComponent(){}

GroupComponent.prototype = new RenderableComponent();

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author William Fernandes Koehler
* @method getSystems
* @return {Array} systems
*/
GroupComponent.prototype.getSystems = function(){
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
GroupComponent.prototype.getTag = function(){
	return "GROUP_COMPONENT";
}

GroupComponent.prototype.genThreeObject = function(){
	return q = new THREE.Group();
}

GroupComponent.prototype.addChild = function(child){
	
}
