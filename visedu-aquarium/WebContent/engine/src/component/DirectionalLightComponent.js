function DirectionalLightComponent(){}

DirectionalLightComponent.prototype = new LightComponent();

/**
* Método construtor da classe CubeRenderComponent.
*
* @author William FK
* @method initialize
* @param {Color} color
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(DirectionalLightComponent.prototype, "initialize", 
	function(target_x, target_y, target_z, color, intensity){
		this.initialize();
		this.color = color;
		this.intensity = intensity;
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
DirectionalLightComponent.prototype.getSystems = function(){
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
DirectionalLightComponent.prototype.getTag = function(){
	return "DIRECTIONAL_LIGHT_COMPONENT";
}

DirectionalLightComponent.prototype.genThreeObject = function(){
	var light = new THREE.DirectionalLight(this.color, this.intensity);
	
	light.target.position.set(this.target_x, this.target_y, this.target_z);
	light.target.matrixWorld.elements[ 12 ] = this.target_x;
	light.target.matrixWorld.elements[ 13 ] = this.target_y;
	light.target.matrixWorld.elements[ 14 ] = this.target_z;
	
	return light;
}

DirectionalLightComponent.prototype.genHelper = function(size){
	return this.helper = new THREE.DirectionalLightHelper(this.owner.threeObject, size);
}