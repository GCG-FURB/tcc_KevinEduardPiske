function SpotLightComponent(){}

SpotLightComponent.prototype = new LightComponent();

/**
* Método construtor da classe CubeRenderComponent.
*
* @author William FK
* @method initialize
* @param {Color} color
* @return {BoxRenderComponent} object
*/ 
JSUtils.addMethod(SpotLightComponent.prototype, "initialize",		
	function(target_x, target_y, target_z, color, intensity, distance, angle, exponent){
		this.initialize();
		this.color = color;
		this.intensity = intensity;
		this.angle = angle;
		this.distance = distance;
		this.exponent = exponent;
		this.target_x = target_x; 
		this.target_y = target_y;
		this.target_z = target_z;
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
SpotLightComponent.prototype.getSystems = function(){
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
SpotLightComponent.prototype.getTag = function(){
	return "SPOT_LIGHT_COMPONENT";
}

SpotLightComponent.prototype.genThreeObject = function(){
	var light = new THREE.SpotLight(this.color, this.intensity, this.distance, this.angle, this.exponent);
	light.target.position.set(this.target_x, this.target_y, this.target_z);
	return light;
}

SpotLightComponent.prototype.genHelper = function(){
	return this.helper = new THREE.SpotLightHelper(this.owner.threeObject);
}