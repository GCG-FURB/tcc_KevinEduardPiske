/**
* Component que renderiza um cubo.
*
* @author William FK
* @class BoxRenderComponent
* @constructor
*/
function AmbientLightComponent(){}

AmbientLightComponent.prototype = new LightComponent();

/**
* Método construtor da classe CubeRenderComponent.
*
* @author William FK
* @method initialize
* @param {Color} color
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(AmbientLightComponent.prototype, "initialize", 
	function(color){
		this.initialize();
		this.color = color;
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
AmbientLightComponent.prototype.getSystems = function(){
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
AmbientLightComponent.prototype.getTag = function(){
	return "AMBIENT_LIGHT_COMPONENT";
}

AmbientLightComponent.prototype.genThreeObject = function(){
	return new THREE.AmbientLight(this.color);
}