/**
 * Classe responsável por agrupar as funções necessárias para manter o contexto 2D da aplicação.
 */
function HTML5CanvasHandler() {}

HTML5CanvasHandler.prototype = new APIHandler();


HTML5CanvasHandler.prototype.getContext = function() {
	return Game.canvas.getContext("2d");
}

HTML5CanvasHandler.prototype.getComponentFactory = function() {
	return new CanvasComponentFactory();
}

HTML5CanvasHandler.prototype.getObjectFactory = function() {
	return new CanvasObjectFactory();
}

HTML5CanvasHandler.prototype.setupCanvas = function (element) {
	return element;
}

HTML5CanvasHandler.prototype.setupCamera = function () {
	var canvas = Game.canvas;
	return new Camera().initialize(canvas.width/2, canvas.height/2);
}

HTML5CanvasHandler.prototype.startGameLoop = function () {
	window.cancelRequestAnimFrame = ( function() {
	    return window.cancelAnimationFrame              ||
	           window.webkitCancelRequestAnimationFrame ||
	           window.mozCancelRequestAnimationFrame    ||
	           window.oCancelRequestAnimationFrame      ||
	           window.msCancelRequestAnimationFrame     ||
	           clearTimeout
	} )();
	window.requestAnimFram = (function(){
		return window.requestAnimationFrame       ||
		       window.webkitRequestAnimationFrame ||
		       window.mozRequestAnimationFrame    ||
		       window.oRequestAnimationFrame      ||
		       window.msRequestAnimationFrame     ||
		       function(callback, element){
		       		window.setTimeout(callback, 1000/Game.frameRate);
		       };
	})();
	
	window.windowLoop = function(){
		Game.requestAnimFram = requestAnimFram(windowLoop);
		Game.gameLoop();
	}
	
	windowLoop();
}

HTML5CanvasHandler.prototype.onRender = function (context) {
	if(RenderSystem.clearCanvas == true){
		context.setTransform(1,0,0,1,0,0);
	    context.clearRect(0,0,Game.canvas.width,Game.canvas.height);
	}

	context.save();

	if(Game.camera){
		context.translate(-Game.camera.centerPoint.x+(Game.canvas.width/2),
			              -Game.camera.centerPoint.y+(Game.canvas.height/2));
		Game.camera.scale.onBeforeRender(context);
		Game.camera.translate.onBeforeRender(context);
		Game.camera.rotate.onBeforeRender(context);
	}

	if(Game.scene){
		for(var i in Game.scene[RenderSystem.getListName()]){
			var component = Game.scene[RenderSystem.getListName()][i];
			component.onBeforeRender(context);
		}
		for(var i in Game.scene[RenderSystem.getListName()]){
			var component = Game.scene[RenderSystem.getListName()][i];
			component.onRender(context);
		}
		for(var i=0; i<Game.scene.listLayers.length; i++){
			var layer = Game.scene.listLayers[i];
			for(var j in layer[RenderSystem.getListName()]){
				var component = layer[RenderSystem.getListName()][j];
				component.onBeforeRender(context);
			}
			for(var j in layer[RenderSystem.getListName()]){
				var component = layer[RenderSystem.getListName()][j];
				component.onRender(context);
			}
			for(var j=0; j<layer.listGameObjects.length; j++){
				var gameObject = layer.listGameObjects[j];
				context.save();
				for(var k in gameObject[RenderSystem.getListName()]){
					var component = gameObject[RenderSystem.getListName()][k];
					component.onBeforeRender(context);
				}
				for(var k in gameObject[RenderSystem.getListName()]){
					var component = gameObject[RenderSystem.getListName()][k];
					component.onRender(context);
				}
				context.restore();
			}
		}
	}

	context.restore();

	for(var i in Game[RenderSystem.getListName()]){
		var component = Game[RenderSystem.getListName()][i];
		component.onBeforeRender(context);
	}
	for(var i in Game[RenderSystem.getListName()]){
		var component = Game[RenderSystem.getListName()][i];
		component.onRender(context);
	}
}
