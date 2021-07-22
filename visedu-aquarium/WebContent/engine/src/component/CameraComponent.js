/**
* Component que renderiza um cubo.
*
* @author William FK
* @class BoxRenderComponent
* @constructor
*/
function CameraComponent(){}

CameraComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe CubeRenderComponent.
*
* @author William FK
* @method initialize
* @param {int} angle
* @param {int} near
* @param {int} far
* @return {BoxRenderComponent} object
*/
JSUtils.addMethod(CameraComponent.prototype, "initialize", 
	function(aspect, angle, near, far){
		this.initialize();
		this.aspect = aspect;
		this.angle = angle;
		this.near = near;
		this.far = far;
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
CameraComponent.prototype.getSystems = function(){
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
CameraComponent.prototype.getTag = function(){
	return "CAMERA_COMPONENT";
}

CameraComponent.prototype.genThreeObject = function(){
	
	var camera =
		//new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, near, far);
		new THREE.PerspectiveCamera(this.angle||45, this.aspect, this.near||0.1, this.far||10000);	
	return camera;
}

CameraComponent.prototype.genHelper = function(){		
	return this.helper = new THREE.CameraHelper(this.owner.threeObject);
}