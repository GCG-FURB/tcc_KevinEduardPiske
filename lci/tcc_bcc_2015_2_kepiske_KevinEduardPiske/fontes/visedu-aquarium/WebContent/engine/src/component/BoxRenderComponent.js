/**
* Component que renderiza um retângulo.
*
* @author Marcos Harbs
* @class BoxRenderComponent
* @constructor
*/
function BoxRenderComponent(){}

BoxRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe BoxRenderComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Color} fillStyle
* @param {Color} strokeStyle
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(BoxRenderComponent.prototype, "initialize", 
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
BoxRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
BoxRenderComponent.prototype.onRender = function(context){
	if(this.fillStyle != null){
		context.fillStyle = this.fillStyle;
		context.fillRect(this.owner.getCenterX()-(this.owner.getWidth()/2), 
			             this.owner.getCenterY()-(this.owner.getHeight()/2), 
			             this.owner.getWidth(), 
			             this.owner.getHeight());
	}
	if(this.strokeStyle != null){
		context.strokeStyle = this.strokeStyle;
		context.strokeRect(this.owner.getCenterX()-(this.owner.getWidth()/2), 
			               this.owner.getCenterY()-(this.owner.getHeight()/2), 
			               this.owner.getWidth(), 
			               this.owner.getHeight());
	}
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
BoxRenderComponent.prototype.getTag = function(){
	return "BOX_RENDER_COMPONENT";
}

BoxRenderComponent.prototype.genThreeObject = function() {
	var materials = [];
	if (this.fillStyle || this.texture) {
		var material = Game.apiHandler.getBasicMaterial(this.fillStyle, this.texture);
		materials.push(material);
	}
	if (this.strokeStyle) {
		var wireFrameMaterial = Game.apiHandler.getWireframeMaterial(this.strokeStyle);
		materials.push(wireFrameMaterial);
	}
	
	var square = new THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(
			this.owner.getWidth(), this.owner.getHeight()), 
			materials);
	
	return square;
}