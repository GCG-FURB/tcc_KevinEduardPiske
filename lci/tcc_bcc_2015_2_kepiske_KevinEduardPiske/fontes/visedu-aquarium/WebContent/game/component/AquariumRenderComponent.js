function AquariumRenderComponent(){}

AquariumRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe AquariumRenderComponent.
*
* @author Kevin Eduard Piske
* @method initialize
* @param {Color} fillStyle
* @return {SpheresRenderComponent} object
*/
JSUtils.addMethod(AquariumRenderComponent.prototype, "initialize", 
	function(piece){
		this.initialize();
		this.piece = piece;
		this.diameter = piece.properties['diameter'];
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
AquariumRenderComponent.prototype.getSystems = function(){
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
AquariumRenderComponent.prototype.getTag = function(){
	return "AQUARIUM_RENDER_COMPONENT";
}

AquariumRenderComponent.prototype.genThreeObject = function(){
	return this.createAquarium();
}

AquariumRenderComponent.prototype.createAquarium = function() {
	var aquarium = new THREE.Object3D();
	
	var aquariumGeometry = new THREE.SphereGeometry(this.diameter, 30, 30);
	
	aquarium.add(this.createSandGround());
	aquarium.add(this.createSupport());
	aquarium.add(this.createAquariumFront(aquariumGeometry));
	aquarium.add(this.createAquariumBack(aquariumGeometry));
	this.addPlants(aquarium);
	this.addRocks(aquarium);
	
	aquarium.name = this.piece.properties['name'];
	
	return aquarium;
}

AquariumRenderComponent.prototype.createSandGround = function() {
	var circleGeometry = new THREE.CircleGeometry(87, 60);
	var sandTexture = THREE.ImageUtils.loadTexture( './resources/sandTexture.jpg' );
	sandTexture.minFilter = THREE.LinearFilter;
	var material = new THREE.MeshBasicMaterial( { map: sandTexture, overdraw: true } );
	var sandGround = new THREE.Mesh( circleGeometry, material );
	sandGround.rotateX(-(Math.PI / 2));
	sandGround.position.y = -49;
	return sandGround;
}

AquariumRenderComponent.prototype.createSupport = function() {
	var supportHeight = 60;
	var geometry = new THREE.CylinderGeometry(93, 37, supportHeight, 50, 50, false) ;
	var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( './resources/supportTexture.jpg' ), overdraw: true } );
	var support = new THREE.Mesh( geometry, material ) ;
	support.position.y = -80;
	support.add(this.createSupportBase(material, supportHeight));
	return support;
}

AquariumRenderComponent.prototype.createSupportBase = function(material, supportHeight) {
	var geometry = new THREE.CylinderGeometry(70, 70, 10, 50, 10, false);
	var supportBase =  new THREE.Mesh( geometry, material ) ;
	supportBase.position.y = -(supportHeight / 2);
	return supportBase
}

AquariumRenderComponent.prototype.createAquariumFront = function(geometry) {
	// Cria mapa de textura cúbica
	var backgroundPath = "./resources/background/";
	var textureCubeMap = [ backgroundPath + "posx.jpg", backgroundPath + "negx.jpg",
	                       backgroundPath + "posy.jpg", backgroundPath + "negy.jpg",
	                       backgroundPath + "posz.jpg", backgroundPath + "negz.jpg" ];

	// Carrega a textura cúbica
	var textureCube = THREE.ImageUtils.loadTextureCube( textureCubeMap, THREE.CubeRefractionMapping );
	
	// Cria material refratado para visão de fora do aquário
	var refractedMaterial = new THREE.MeshLambertMaterial( { color: 0x40ffdf, envMap: textureCube, refractionRatio: 0.98, reflectivity:0.8, transparent: true, opacity: 0.5 } );
	
	var aquariumFront = new THREE.Mesh( geometry, refractedMaterial );
	return aquariumFront;
}

AquariumRenderComponent.prototype.createAquariumBack = function(geometry) {
	// Cria material de água para visão de dentro do aquário
	var materialBack = new THREE.MeshLambertMaterial( { color: 0x40ffdf, transparent: true, opacity: 0.5 } );
	materialBack.side = THREE.BackSide;
	var aquariumBack = new THREE.Mesh( geometry, materialBack );
	return aquariumBack;
}

AquariumRenderComponent.prototype.addPlants = function(aquarium) {
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	var loader = new THREE.OBJMTLLoader();
	loader.load( "./resources/models/plant/plant.obj", "./resources/models/plant/plant.mtl", function ( object ) {
		object.position.y = -50;
		aquarium.add( object );
	}, ThreeUtils.onProgress, ThreeUtils.onError );
}

AquariumRenderComponent.prototype.addRocks = function(aquarium) {
	this.addArchRock(aquarium);
	this.addSmallBlueRock(aquarium);
	this.addBigBlueRock(aquarium);
}

AquariumRenderComponent.prototype.addArchRock = function(aquarium) {
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	var loader = new THREE.OBJMTLLoader();
	loader.load( "./resources/models/arch_rock/arch_rock.obj", "./resources/models/arch_rock/arch_rock.mtl", function ( object ) {
		object.position.x = -30;
		object.position.y = -50;
		object.position.z = 30;
		object.scale.x = 5;
		object.scale.y = 5;
		object.scale.z = 5;
		aquarium.add( object );
	}, ThreeUtils.onProgress, ThreeUtils.onError );
}

AquariumRenderComponent.prototype.addSmallBlueRock = function(aquarium) {
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	var loader = new THREE.OBJMTLLoader();
	loader.load( "./resources/models/rock/rock.obj", "./resources/models/rock/rock.mtl", function ( object ) {
		object.position.x = 40;
		object.position.y = -45;
		object.position.z = 50;
		object.scale.x = 2;
		object.scale.y = 2;
		object.scale.z = 2;
		aquarium.add( object );
	}, ThreeUtils.onProgress, ThreeUtils.onError );
}

AquariumRenderComponent.prototype.addBigBlueRock = function(aquarium) {
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	var loader = new THREE.OBJMTLLoader();
	loader.load( "./resources/models/rock/rock.obj", "./resources/models/rock/rock.mtl", function ( object ) {
		object.position.x = 20;
		object.position.y = -50;
		object.position.z = -40;
		object.scale.x = 5;
		object.scale.y = 5;
		object.scale.z = 5;
		aquarium.add( object );
	}, ThreeUtils.onProgress, ThreeUtils.onError );
}