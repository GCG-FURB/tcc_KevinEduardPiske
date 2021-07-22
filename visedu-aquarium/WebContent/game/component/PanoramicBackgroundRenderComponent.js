function PanoramicBackgroundRenderComponent(){}

PanoramicBackgroundRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe PanoramicBackgroundRenderComponent.
*
* @author Kevin Eduard Piske
* @method initialize
* @param {Color} fillStyle
* @return {SpheresRenderComponent} object
*/
JSUtils.addMethod(PanoramicBackgroundRenderComponent.prototype, "initialize", 
	function(size){
		this.initialize();
		this.size = size;
		return this;
	}
);

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Kevin Eduard Piske
* @method getSystems
* @return {Array} systems
*/
PanoramicBackgroundRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Kevin Eduard Piske
* @method getTag
* @return {String} tag
*/
PanoramicBackgroundRenderComponent.prototype.getTag = function(){
	return "PANORAMIC_BACKGROUND_RENDER_COMPONENT";
}

PanoramicBackgroundRenderComponent.prototype.genThreeObject = function(){
	var backgroundPath = "./resources/background/";

	// Cria mapa de textura cúbica
	var textureCubeMap = [ backgroundPath + "posx.jpg", backgroundPath + "negx.jpg",
	                       backgroundPath + "posy.jpg", backgroundPath + "negy.jpg",
	                       backgroundPath + "posz.jpg", backgroundPath + "negz.jpg" ];

	// Carrega a textura cúbica
	var textureCube = THREE.ImageUtils.loadTextureCube( textureCubeMap, THREE.CubeRefractionMapping );
	
	// Atribui a textura cúbica ao shader
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;

	// Cria o material baseado em shader
	var material = new THREE.ShaderMaterial( {
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		side: THREE.BackSide
	} ), mesh = new THREE.Mesh( new THREE.BoxGeometry( this.size, this.size, this.size ), material );
	
	return mesh;
}