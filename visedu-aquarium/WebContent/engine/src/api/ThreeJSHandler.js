/**
 * 
 */
function ThreeJSHandler() {}

ThreeJSHandler.prototype = new APIHandler();


ThreeJSHandler.prototype.activeAnimations = [];

ThreeJSHandler.prototype.setupCanvas = function(element) {
	this.renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	element.append(this.renderer.domElement);
	this.renderer.setSize(element.width(), element.height());
	return this.renderer.domElement;
}

ThreeJSHandler.prototype.addActiveAnimation = function(animation) {
	this.activeAnimations.push(animation);
}

ThreeJSHandler.prototype.stopAnimation = function(animation) {
	$.each(this.activeAnimations, function(index, item) {
		if (item == animation) {
			Game.apiHandler.activeAnimations.splice(index, 1);
			return false;
		}
	});
}

ThreeJSHandler.prototype.playAnimations = function() {
	$.each(this.activeAnimations, function(index, item) {
		item.update();
	});
}

ThreeJSHandler.prototype.getContext = function() {
	return this.renderer.domElement;
}

ThreeJSHandler.prototype.setupScene = function(scene) {
	scene.threeObject = new THREE.Scene();
}

ThreeJSHandler.prototype.setupCamera = function(angle, near, far) {
	var canvas = Game.canvas;
	return new Camera().initialize(0, 0, 0, canvas.width / canvas.height,
			angle, near, far);
}

ThreeJSHandler.prototype.gameLoop = function() {
	requestAnimationFrame(ThreeJSHandler.prototype.gameLoop);
	Game.gameLoop();
}

ThreeJSHandler.prototype.startGameLoop = function() {
	this.gameLoop();
}

ThreeJSHandler.prototype.onRender = function() {
	this.renderer.clear(); 
	this.renderer.clearDepth(); 
	this.renderer.render(Game.scene.threeObject, Game.camera.threeObject);
	this.playAnimations();
	var lookAt = Game.camera.v3LookAt;
	if (lookAt) {
		Game.camera.lookAt(lookAt);
	}
}

ThreeJSHandler.prototype.beforeRender = function() {
}

ThreeJSHandler.prototype.addGameObject = function(object, parent) {
	var threeObject = object.threeObject;
	if (threeObject) {
		parent.threeObject.add(object.threeObject);
	}
}

ThreeJSHandler.prototype.removeGameObject = function(object, parent) {
	var threeObject = object.threeObject;
	if (threeObject) {
		parent.threeObject.remove(object.threeObject);
	}
}

ThreeJSHandler.prototype.newGameElement = function(element, owner) {
	var threeObject = element.genThreeObject();
	if (threeObject) {
		owner.threeObject = threeObject;
	}
}

ThreeJSHandler.prototype.getComponentFactory = function() {
	return new ThreeJSComponentFactory();
}

ThreeJSHandler.prototype.getObjectFactory = function() {
	return new ThreeJSObjectFactory();
}

ThreeJSHandler.prototype.getBasicMaterial = function(fillStyle, texture) {
	var color = ColorUtils.checkColor(fillStyle);
	if (texture) {
		var material = new THREE.MeshPhongMaterial({
			color : color,
			side : THREE.DoubleSide,
			map : THREE.ImageUtils.loadTexture(texture),
			transparent : true
		});
	} else {
		var material = new THREE.MeshPhongMaterial({
			color : color,
			ambient: color,
			overdraw: true,
			side: THREE.DoubleSide
		});
	}
	return material;
}

ThreeJSHandler.prototype.getLineMaterial = function(color) {
	return new THREE.LineBasicMaterial({
		color: color
	});
}


ThreeJSHandler.prototype.getWireframeMaterial = function(strokeStyle,
		strokeWidth) {
	var wireframeMaterial = new THREE.MeshBasicMaterial({
		color : ColorUtils.checkColor(strokeStyle),
		wireframe : true
	});

	return wireframeMaterial;
}

ThreeJSHandler.prototype.onAddMove = function(object) {
	var comp = ComponentUtils.getComponent(object, "TRANSLATE_COMPONENT");
	if (comp) {
		comp.doTranslate();
	}
}

ThreeJSHandler.prototype.changeColorObject = function(object, body, stroke) {
	var meshes = object.threeObject.children;
	if (body == 0 || body) {
		meshes[0].material.color.setHex(ColorUtils.checkColor(body));
	}

	if (stroke == 0 || stroke) {
		meshes[1].material.color.setHex(ColorUtils.checkColor(stroke));
	}
}