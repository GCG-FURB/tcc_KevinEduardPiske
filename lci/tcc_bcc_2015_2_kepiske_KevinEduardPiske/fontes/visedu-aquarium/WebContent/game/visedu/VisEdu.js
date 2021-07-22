var VisEdu = new function() {
	
	this.root = null;
	this.factory = null;
	this.factory3D = new Factory3D();
	this.aspect = 0;
	this.clearColor = 0;
	this.backgroundColor = 0;
	this.properties = null;
	this.stats = null;
	
	// variáveis utilizadas pelo reasoner
	this.timeOfInstantiation = null;
	this.HAND_SHAKE = "HAND_SHAKE";
	this.isOpen = false;
	this.queue = [];
	this.averageReasoningTime = 0;
	this.webSocket = null;
	
	this.setupFactory = function() {
		var current = this.factory;
		this.factory = this.factory3D;
		this.setup3D();
		PropertiesController.check3DProperties();
		if (current && this.factory != current) {
			this.reloadScene();
		}
	}
	
	this.setup = function() {
		this.scene = new Scene().initialize(-1000, -1000, 1000, 1000);
		this.defLight = ThreeJSBuilder.createAmbientLightObject(0xFFFFFF);
		this.scene.addLight(this.defLight);
		this.root = new Layer().initialize();
		this.scene.addLayer(this.root);
	}
	
	this.loadStats = function() {
		this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0.5%';
		this.stats.domElement.style.right = '0';
		this.stats.domElement.style.zIndex = 100;
		$(Game.apiHandler.getContext()).parent().append( this.stats.domElement );
	}
	
	this.afterLoad = function() {		
		// Constrói o fundo panorâmico
		var panoramicBackgroundObject = this.factory.createPanoramicBackground(5000);
		Game.apiHandler.addGameObject(panoramicBackgroundObject, this.scene);
	}

	this.setup3D = function() {
		Game.apiHandler.controls.reset();
		Game.camera.threeObject.position.set(0, 100, 250); // x, y, z da câmera principal
		Game.camera.threeObject.lookAt(new THREE.Vector3(0, 0 ,0));	
		Game.apiHandler.controls.noRotate=false;
	}
	
	this.create = function (world) {
		Game.loadAPI(new ThreeJSCustomHandler());
		window.addEventListener( 'resize', this.onResize, false );
		VisEdu.aspect = world.width() / (world.height());
		this.setup();
		Game.init(world, this.scene);
		this.setupFactory();
		var connection = "ws://" + (document.location.hostname == "" ? "localhost" : document.location.hostname) + ":" +
        (document.location.port == "" ? "8080" : document.location.port + "/visedu-reasoner/jason");
		this.createWebSocket(connection); // ws://localhost:8081/visedu-reasoner/jason
		this.afterLoad();
	}
	
	this.onResize = function (){
		var target = $('.world');
		VisEdu.aspect = target.width() / (target.height());
		VisEdu.setupCamera(Game.camera.threeObject);
		var auxCam = Game.apiHandler.auxCamera;
		if (auxCam) {
			VisEdu.setupCamera(auxCam.threeObject);	
		}
	    Game.apiHandler.renderer.setSize( target.width(), target.height() );
	}
	
	this.reloadProperties = function (properties) {
		this.properties = properties;
	}
	
	this.setupCamera = function (camera) {
		if(camera) {
			camera.aspect = VisEdu.aspect;
			camera.updateProjectionMatrix();
		}
	}
	
	this.reloadScene = function() {
		var renderer = $('.piece.renderer');
		var json = PiecesUtils.genJSON(renderer);
		
		var node = $('.renderer + .object-node')
		$.each(node.find('> .connector.busy'), function(index, item) {
			var piece = $(item).find('> .piece.element').data('piece');
			piece.type.treeBehavior.removePiece(piece);
		});
		
		PiecesUtils.readJSON(renderer, json);
	}
	
	this.createWebSocket = function(uri){
		var visEdu = this;
		if ('WebSocket' in window || 'MozWebSocket' in window) {
			this.webSocket = new WebSocket(uri);
			this.timeOfInstantiation = Date.now();
		} else {
			alert("Browser não suporta WebSocket");
			return this;
		}
		this.webSocket.onmessage = function(evt) { 
			visEdu.onMessage(evt)
		};
		this.webSocket.onopen = function(evt) { 
			visEdu.onOpen(evt)
		};
		this.webSocket.onclose = function(evt) { 
			visEdu.onClose(evt) 
		};
		this.webSocket.onerror = function(evt) { 
			visEdu.onError(evt)
		};
	}

	this.onClose = function(evt) {
		this.isOpen = false;
		console.log("onClose: " + evt.data);	
	}

	this.onError = function(evt) {
		console.log("onError: " + evt.data);
	}

	this.onOpen = function(evt) {
		if (this.timeOfInstantiation != null) {
			var now = Date.now();
			console.log("Time to establish connection: " + Math.abs(now - this.timeOfInstantiation) / 1000);	
			this.timeOfInstantiation = null;
		}
		this.webSocket.send(this.HAND_SHAKE);
	}

	this.onMessage = function(evt){ 
		if (this.HAND_SHAKE == evt.data) {
			this.isOpen = true;
		} else {
			var now = new Date();
			var sendDate = this.queue.shift();
			var reasoningTime = Math.abs(now - sendDate)/1000;
			if ( this.averageReasoningTime == 0 ) {
				this.averageReasoningTime = reasoningTime;
			} else {
				this.averageReasoningTime = (this.averageReasoningTime + reasoningTime) / 2;
			}
			//console.log("Tempo médio de raciocínio: " + this.averageReasoningTime);
			var action = JSON.parse(evt.data).action;
			this.executeAction(action);
		}
	}

	this.executeAction = function(action) {
		var arrAction = action.split("(");
		var actionString = arrAction[0];
		
		switch(actionString) {
			case "explore":
				this.executeActionExplore(arrAction);
				break;
			case "flee":
				this.executeActionFlee(arrAction);
				break;
			case "pursue":
				this.executeActionPursue(arrAction);
				break;
			case "eat":
				this.executeActionEat(arrAction);
				break;
			default:
		}
		
		//console.log("executeAction: " + action);	
	}
	
	this.executeActionExplore = function(arrAction) {
		arrAction = arrAction[1].split(")");
		arrAction = arrAction[0].split(",");
		var perceptorName = StringUtils.replaceAll(arrAction[0], "\"", "");
		var objectsMap = Game.apiHandler.getObjectsMap();
		var perceptorObject = objectsMap[perceptorName];
		if(perceptorObject) {
			perceptorObject.storeReasonerMessage("Reasoner: " + perceptorName + " deve explorar\n");
		}
	}
	
	this.executeActionFlee = function(arrAction) {
		arrAction = arrAction[1].split(")");
		arrAction = arrAction[0].split(",");
		var perceptorName = StringUtils.replaceAll(arrAction[0], "\"", "");
		var perceivedName = StringUtils.replaceAll(arrAction[1], "\"", "");
		var objectsMap = Game.apiHandler.getObjectsMap();
		
		var perceptorObject = objectsMap[perceptorName];
		
		if(perceptorObject) {
			perceptorObject.shouldFlee = true;
			perceptorObject.storeReasonerMessage("Reasoner: " + perceptorName + " deve fugir de " + perceivedName + "\n");
		}
	}
	
	this.executeActionPursue = function(arrAction) {
		arrAction = arrAction[1].split(")");
		arrAction = arrAction[0].split(",");
		var perceptorName = StringUtils.replaceAll(arrAction[0], "\"", "");
		var perceivedName = StringUtils.replaceAll(arrAction[1], "\"", "");
		var objectsMap = Game.apiHandler.getObjectsMap();
		
		var perceptorObject = objectsMap[perceptorName];
		
		if(perceptorObject) {
			perceptorObject.shouldPursue = true;
			perceptorObject.storeReasonerMessage("Reasoner: " + perceptorName + " deve perseguir " + perceivedName + "\n");
		}
	}
	
	this.executeActionEat = function(arrAction) {
		arrAction = arrAction[1].split(")");
		arrAction = arrAction[0].split(",");
		var perceptorName = StringUtils.replaceAll(arrAction[0], "\"", "");
		var perceivedName = StringUtils.replaceAll(arrAction[1], "\"", "");
		var objectsMap = Game.apiHandler.getObjectsMap();
		
		var perceptorObject = objectsMap[perceptorName];
		var perceivedObject = objectsMap[perceivedName];
		
		if(perceivedObject) {
			perceivedObject.piece.type.treeBehavior.removePiece(perceivedObject.piece);
			DragAndDropController.fitTree();
		}
		
		if(perceptorObject) {
			perceptorObject.lastTimeToDeath = Date.now();
			perceptorObject.storeReasonerMessage("Reasoner: " + perceptorName + " deve comer " + perceivedName + "\n");
		}
		
		Game.apiHandler.sardineEatenCount++;
	}
	
}