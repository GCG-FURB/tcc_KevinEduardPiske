/**
* Component que renderiza um cubo.
*
* @author William FK
* @class BoxRenderComponent
* @constructor
*/
function GridRenderComponent(){}

GridRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe GridRenderComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Color} fillStyle
* @param {Color} strokeStyle
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(GridRenderComponent.prototype, "initialize", 
	function(steps){
		this.initialize();
		this.steps = steps;
		return this;
	}
);

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
GridRenderComponent.prototype.getSystems = function(){
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
GridRenderComponent.prototype.getTag = function(){
	return "GRID_RENDER_COMPONENT";
}

GridRenderComponent.prototype.genThreeObject = function(){
	//var material = Game.apiHandler.getBasicMaterial(this.fillStyle);
	var grid = new THREE.GridHelper(this.owner.width, this.steps);
	return grid;
}