function FishRenderComponent(){}

FishRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe FishRenderComponent.
*
* @author Kevin Eduard Piske
* @method initialize
* @param {Color} fillStyle
* @return {SpheresRenderComponent} object
*/
JSUtils.addMethod(FishRenderComponent.prototype, "initialize", 
	function(piece){
		this.initialize();
		this.piece = piece;
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
FishRenderComponent.prototype.getSystems = function(){
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
FishRenderComponent.prototype.getTag = function(){
	return "FISH_RENDER_COMPONENT";
}

FishRenderComponent.prototype.genThreeObject = function(){
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	var container = new THREE.Object3D();
	
	var name = this.piece.properties['name'];
	var obj = this.piece.properties['obj'];
	var mtl = this.piece.properties['mtl'];
	var showVision = this.piece.properties['showVision'];
	var visionRadius = this.piece.properties['visionRadius'];
	var visionRange = this.piece.properties['visionRange'];
	
	var loader = new THREE.OBJMTLLoader();
	loader.load(obj, mtl, function ( object ) {
		this.bbox = new THREE.Box3().setFromObject(object);
		var size = this.bbox.size();
		container.userData = { size: size };
		
		var geometry = new THREE.CylinderGeometry(visionRadius, 1, visionRange, 4, 4, false) ;
		var material = new THREE.MeshBasicMaterial( { color: 0xff0000} );
		var vision = new THREE.Mesh(geometry, material);
		
		vision.translateZ((visionRange / 2) + (size.z / 2));
		
		vision.rotateX(Math.PI / 2); //90 graus
		vision.name = "vision";
		vision.visible = showVision;
		
		var camera = new THREE.PerspectiveCamera(45, VisEdu.aspect, 0.1, 4000);
		camera.translateZ((visionRange / 2) + (size.z / 2));
		camera.rotateY((Math.PI / 1.158));
		
		container.add(vision);
		container.add(object);
		container.add(camera);
	}, ThreeUtils.onProgress, ThreeUtils.onError );
	
	container.name = name;
	
	return container;
}