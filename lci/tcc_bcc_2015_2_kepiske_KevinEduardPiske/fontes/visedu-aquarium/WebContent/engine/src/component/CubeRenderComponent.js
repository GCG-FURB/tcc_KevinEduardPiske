/**
* Component que renderiza um cubo.
*
* @author William FK
* @class BoxRenderComponent
* @constructor
*/
function CubeRenderComponent(){}

CubeRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe CubeRenderComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Color} fillStyle
* @param {Color} strokeStyle
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(CubeRenderComponent.prototype, "initialize", 
	function(fillStyle, strokeStyle, texture){
		this.initialize();
		this.fillStyle = fillStyle;
		this.strokeStyle = strokeStyle;
		this.texture = texture;
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
CubeRenderComponent.prototype.getSystems = function(){
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
CubeRenderComponent.prototype.getTag = function(){
	return "CUBE_RENDER_COMPONENT";
}

CubeRenderComponent.prototype.genThreeObject = function(){	
	var material = Game.apiHandler.getBasicMaterial(this.fillStyle, this.texture);
	var materials = [material];
	if (this.strokeStyle) {
		var wireFrameMaterial = Game.apiHandler.getWireframeMaterial(this.strokeStyle);
		materials.push(wireFrameMaterial);
	}
	
	var cube = new THREE.SceneUtils.createMultiMaterialObject(
		new THREE.BoxGeometry(this.owner.getWidth(), this.owner.getHeight(), this.owner.getDepth()), 
		materials);
	return cube;
}