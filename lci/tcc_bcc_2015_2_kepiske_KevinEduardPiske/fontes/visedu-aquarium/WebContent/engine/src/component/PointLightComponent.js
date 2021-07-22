function PointLightComponent(){}

PointLightComponent.prototype = new LightComponent();

/**
* Método construtor da classe CubeRenderComponent.
*
* @author William FK
* @method initialize
* @param {Color} color
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(PointLightComponent.prototype, "initialize", 
	function(color, intensity, distance){
		this.initialize();
		this.color = color;
		this.intensity = intensity;
		this.distance = distance;
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
PointLightComponent.prototype.getSystems = function(){
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
PointLightComponent.prototype.getTag = function(){
	return "POINT_LIGHT_COMPONENT";
}

PointLightComponent.prototype.genThreeObject = function(){
	return new THREE.PointLight(this.color, this.intensity, this.distance);
}

PointLightComponent.prototype.genHelper = function(size){
	return this.helper = new THREE.PointLightHelper(this.owner.threeObject, size);
}