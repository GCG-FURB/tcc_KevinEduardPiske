function HemisphereLightComponent(){}

HemisphereLightComponent.prototype = new LightComponent();

/**
* Método construtor da classe CubeRenderComponent.
*
* @author William FK
* @method initialize
* @param {Color} color
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(HemisphereLightComponent.prototype, "initialize", 
	function(color, background, intensity){
		this.initialize();
		this.color = color;
		this.background = background;
		this.intensity = intensity;
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
HemisphereLightComponent.prototype.getSystems = function(){
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
HemisphereLightComponent.prototype.getTag = function(){
	return "HEMISPHERE_LIGHT_COMPONENT";
}

HemisphereLightComponent.prototype.genThreeObject = function(){
	return new THREE.HemisphereLight(this.color, this.background, this.intensity);
}

HemisphereLightComponent.prototype.genHelper = function(arrowRange){
	return this.helper = new THREE.HemisphereLightHelper(this.owner.threeObject, arrowRange);
}