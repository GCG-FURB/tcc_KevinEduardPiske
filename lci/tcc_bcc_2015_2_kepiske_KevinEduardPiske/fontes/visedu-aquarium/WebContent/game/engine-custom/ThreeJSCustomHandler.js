function ThreeJSCustomHandler() {}

ThreeJSCustomHandler.prototype = new ThreeJSHandler();
ThreeJSCustomHandler.prototype.$onRender = ThreeJSCustomHandler.prototype.onRender;
ThreeJSCustomHandler.prototype.$startGameLoop = ThreeJSCustomHandler.prototype.startGameLoop;

ThreeJSCustomHandler.prototype.controls;
ThreeJSCustomHandler.prototype.objectsMap = {};
ThreeJSCustomHandler.prototype.selectedFish;
ThreeJSCustomHandler.prototype.sardineCount = 0;
ThreeJSCustomHandler.prototype.sharkCount = 0;
ThreeJSCustomHandler.prototype.sardineEatenCount = 0;
ThreeJSCustomHandler.prototype.percept = true;

ThreeJSCustomHandler.prototype.setupCamera = function (angle, near, far) {
	var canvas = Game.canvas;
	var camera = new Camera().initialize(0, 0, 0, canvas.width/Math.round(canvas.height/2), angle, near, far);
	this.setupOrbitControl(camera.threeObject);
	return camera;
}

ThreeJSCustomHandler.prototype.setupOrbitControl = function(camera) {
	this.controls = new THREE.OrbitControls( camera, Game.canvas );
	this.controls.damping = 0.2;
	this.touchControls = new TouchControls();
	this.touchControls.setup();
}

ThreeJSCustomHandler.prototype.addGameObject = function(object, parent) {
	var threeObject = object.threeObject;
	if (threeObject) {
		parent.threeObject.add(threeObject);
	}

	// Mapeia os objetos através de seus nomes
	if (threeObject.name != "") {
		this.objectsMap[threeObject.name] = object;
	}
}

ThreeJSCustomHandler.prototype.removeGameObject = function(object, parent) {
	var threeObject = object.threeObject;
	if (threeObject) {
		parent.threeObject.remove(object.threeObject);
	}
	
	// Remove o objeto gráfico do mundo
	if(Game.apiHandler.selectedFish && Game.apiHandler.selectedFish == object) {
		// Remove peixe selecionado
		Game.apiHandler.selectedFish = null;
		// Remove câmera auxiliar
		Game.apiHandler.auxCamera = null;
		// Limpa área de texto
		$('#messages-area').val('');
	}
	
	delete this.objectsMap[object.name];
}

ThreeJSCustomHandler.prototype.startGameLoop = function() {
	VisEdu.loadStats();
	this.$startGameLoop();	
}

ThreeJSCustomHandler.prototype.onRender = function() {
	this.controls.update();
	VisEdu.stats.update();

	// Itera sobre os objetos presentes no mapa
	$.each(ThreeJSCustomHandler.prototype.objectsMap, function(index, value){
		var threeObject = value.threeObject;
		if(threeObject) {
			if(threeObject.name != "") { // Meus objetos possuem nomes
				value.update(ThreeJSCustomHandler.prototype.objectsMap);
			}
		}
	})
}

ThreeJSCustomHandler.prototype.beforeRender = function() {
	var left = 0;
	var bottom = 0;
	var width = Game.canvas.width;
	var height = Game.canvas.height;

	this.renderer.setClearColor(0);
	this.renderer.setViewport(left, bottom, width, height);
	this.renderer.setScissor(left, bottom, width, height);
	this.renderer.enableScissorTest(true);
	this.renderer.setClearColor(VisEdu.clearColor);
	Game.camera.threeObject.aspect = width / height;
	Game.camera.threeObject.updateProjectionMatrix();
	this.renderer.render(Game.scene.threeObject, Game.camera.threeObject);
	
	if (this.auxCamera) {		
		left = Math.floor(width - (width / 4));
		height = Math.floor(height / 4);
		this.renderer.setViewport( left, bottom, width, height);
		this.renderer.setScissor( left, bottom, width, height);
		this.renderer.enableScissorTest(true);
		this.renderer.setClearColor(0x40a4df);
		this.auxCamera.aspect = left / height;
		this.renderer.render(Game.scene.threeObject, this.auxCamera);
	}
}

ThreeJSCustomHandler.prototype.getObjectsMap = function() {
	return ThreeJSCustomHandler.prototype.objectsMap;
}