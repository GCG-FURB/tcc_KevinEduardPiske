/**
* Classe que representa um objeto do tipo fish.
*
* @author Kevin Eduard Piske
* @class FishObject
* @constructor
*/
function FishObject(){}

FishObject.prototype = new GameObject();

/**
* Método construtor da classe FishObject.
*
* @author Kevin Eduard Piske
* @method initialize
* @param {Component} component
* @param {Piece} piece 
* @return {FishObject} object
*/
JSUtils.addMethod(FishObject.prototype, "initialize", 
	function(component, piece){
		this.initialize(0, 0, 0, 0, 0, 0); // Sem importância os valores aqui
		
		ComponentUtils.addComponent(this, this.component = component);
		
		this.piece = piece;
		
		var direction = (Math.floor((Math.random() * 2) + 1) == 1); // true ou false
		this.moveSpeed = this.piece.properties['moveSpeed'];
		this.deltaRotation = this.moveSpeed * (Math.PI / 180);
		if(direction) {
			this.deltaRotation *= -1;
		}
		this.deltaHeight = this.deltaRotation;
		
		this.name = this.piece.properties['name'];
		this.type = this.piece.type;
		
		this.lastTime = Date.now();
		this.lastTimeToDeath = Date.now();
		this.deltaHeight = 0.0005;
		
		var positionX = (Math.floor((Math.random() * 100) - 50)); // de -50 a 50
		var positionZ = (Math.floor((Math.random() * 100) - 50));
		this.threeObject.translateX(positionX);
		this.threeObject.translateZ(positionZ);
		
		this.shouldFlee = false;
		this.shouldPursue = false;
		this.shouldEat = this.piece.properties['shouldEat'];
		
		this.pointZero = new THREE.Vector3(0, 0, 0);
		
		this.frameCount = 0;
		
		this.reasonerMessages = "";
		this.lastMessage = "";
		
		VisEdu.webSocket.send("{ \"action\" : \"createAgent\", \"name\" : \"" + this.name + "\", \"agentType\" : \"" + this.type.name + "\" }");
		return this;
	}
);

FishObject.prototype.update = function(objectsMap) {
	if(this.isReady()) {
		if(this.vision == null) {
			this.vision = this.threeObject.children[0];
			this.camera = this.threeObject.children[2];
		}
		
		if(Game.apiHandler.properties['speedMultiplier'] != 0) {
			if(this.frameCount >= 2) {
				if(Game.apiHandler.percept) {
					this.percept(objectsMap);
				}
				this.frameCount = 0;
			}
			this.move();
		}
	}
	this.frameCount++;
}

FishObject.prototype.isReady = function() {
	if(this.threeObject.children.length > 0) { // Se existir algum filho, é porque o carregamento do modelo obj está finalizado
		return true;
	}
	return false;
}

FishObject.prototype.percept = function(objectsMap) {
	if(this.vision != null) {
		var thisObject = this;
		$.each(objectsMap, function(index, value){
			if(thisObject != value) {
				if(value.type.name != "Aquário") {
					if(value.threeObject) {
						if(value.threeObject.name != "") { // Meus objetos possuem nomes
							if(thisObject.detectCollisionBBox(thisObject.threeObject.children[0], value.threeObject.children[1])) { // Visão deste com o outro peixe
								//VisEdu.queue.push(new Date());
								VisEdu.webSocket.send("{ \"action\" : \"perception\", \"name\" : \"" + thisObject.threeObject.name + "\",\"perceptions\" : [\"onPercept(\\\"" + thisObject.threeObject.name + "\\\",\\\"" + value.threeObject.name + "\\\",\\\"" + value.type.name + "\\\")\"] }");
								if(thisObject.shouldEat) {
									if(thisObject.detectCollisionBBox(thisObject.threeObject.children[1], value.threeObject.children[1])) {
										//VisEdu.queue.push(new Date());
										VisEdu.webSocket.send("{ \"action\" : \"perception\", \"name\" : \"" + thisObject.threeObject.name + "\",\"perceptions\" : [\"onCollide(\\\"" + thisObject.threeObject.name + "\\\",\\\"" + value.threeObject.name + "\\\",\\\"" + value.type.name + "\\\")\"] }");
									}
								}
							}
						}
					}
				}
			}
		});
	}
}

FishObject.prototype.detectCollisionBBox = function(object1, object2) {
	if(object1 && object2) {
		var object1BBox = new THREE.Box3().setFromObject(object1);
		var object2BBox = new THREE.Box3().setFromObject(object2);
		var collision = object1BBox.isIntersectionBox(object2BBox);
		if(collision) {
			return true;
		}
	}
	return false;
}

//TODO Detecção de colisão por RayCaster não está funcionando direito, o código ficará para ter como base
//FishObject.prototype.detectCollisionRayCaster = function(object) {
//	if(this.vision) {
//		var collidableMeshList = [];
//		collidableMeshList.push(this.vision);
//		var originPoint = this.vision.position.clone();
//		for (var vertexIndex = 0; vertexIndex < this.vision.geometry.vertices.length; vertexIndex++)	{		
//			var localVertex = this.vision.geometry.vertices[vertexIndex].clone();
//			var globalVertex = localVertex.applyMatrix4( this.vision.matrix );
//			var directionVector = globalVertex.sub( this.vision.position );
//			
//			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
//			var collisionResults = ray.intersectObjects( collidableMeshList , true);
//			var a = collisionResults.length;
//			if(a > 0) {
//				var b = collisionResults[0].distance;
//				var c = directionVector.length();
//				if (b < c) {
//					return true;
//				}
//			}
//		}	
//	}
//	return false;
//}

FishObject.prototype.move = function() {
	if(this.shouldFlee) {
		this.flee();
		return;
	}
	
	if(this.shouldPursue) {
		this.pursue();
		return;
	}
	
	this.verifyMoveBehavior();
	
	if(this.type.name === "Tubarão") {
		this.verifyTimeToDeath();
	}
	
	var objectAux = this.threeObject.clone();
	objectAux.rotation.y = this.deltaRotation;
	objectAux.translateZ(this.getMoveSpeed());
	var distance = objectAux.position.distanceTo(this.pointZero);
	
	this.verifyMoveHeight();
	
	this.rotate('x', this.deltaHeight / 2);
	
	if (distance > 80){
		this.rotate('y', -(Math.PI / 4));
		this.deltaRotation *= -1;
		var speed = this.getMoveSpeed() * 2;
		this.translate('z', speed);
	}  else {
		if(distance > 70) {
			this.rotate('y', this.getDeltaRotation() * 2.5);
		} else {
			if(distance > 60) {
				this.rotate('y', this.getDeltaRotation() * 1.5);
			} else {
				this.rotate('y', this.getDeltaRotation());
			}
		}
	}
	
	this.translate('z', this.getMoveSpeed());
}

FishObject.prototype.rotate = function(direction, value) {
	switch (direction) {
	case 'x':
		this.threeObject.rotateX(value);
		break;
	case 'y':
		this.threeObject.rotateY(value);
		break;
	case 'z':
		this.threeObject.rotateZ(value);
		break;
	default:
		break;
	}
}

FishObject.prototype.translate = function(direction, value) {
	switch (direction) {
	case 'x':
		this.threeObject.translateX(value);
		break;
	case 'y':
		this.threeObject.translateY(value);
		break;
	case 'z':
		this.threeObject.translateZ(value);
		break;
	default:
		break;
	}
}

FishObject.prototype.verifyMoveBehavior = function() {
	var currentTime = Date.now();
	if(currentTime > (this.lastTime + (1000 / this.getTimeSpeedMultiplier()))) { // A cada 1 segundo altera a movimentação do peixe
		var direction = (Math.floor((Math.random() * 2) + 1) == 1); // true ou false
		if(direction) {
			this.deltaHeight *= -1;
		}
		this.lastTime = currentTime;
		//console.log("Tempo médio de raciocínio: " + VisEdu.averageReasoningTime);
	}
}

FishObject.prototype.verifyTimeToDeath = function() {
	var currentTime = Date.now();
	if(currentTime > (this.lastTimeToDeath + (60000 / this.getTimeSpeedMultiplier()))) {
		this.piece.type.treeBehavior.removePiece(this.piece);
		this.lastTimeToDeath = currentTime;
	}
}

FishObject.prototype.verifyMoveHeight = function() {
	if(this.threeObject.position.y >= 20 || this.threeObject.position.y <= -20) {
		this.deltaHeight *= -1;
	}
}

FishObject.prototype.flee = function() {
	var speed = this.getMoveSpeed() * 5; // Ao fugir, peixe fica 5 vezes mais rápido
	var direction = (Math.floor((Math.random() * 2) + 1) == 1); // true ou false
	if(direction) {
		this.rotate('y', -(Math.PI / 3));
	} else {
		this.rotate('y', Math.PI / 3);
	}
	this.deltaRotation *= -1;
	this.deltaHeight *= -1;
	this.translate('z', speed);
	this.shouldFlee = false;
}

FishObject.prototype.pursue = function() {
	var speed = this.getMoveSpeed() * 5; // Ao perseguir, peixe fica 5 vezes mais rápido
	this.translate('z', speed);
	this.shouldPursue = false;
}

FishObject.prototype.updateProperty = function(property) {
	switch (property.key) {
		case "showVision":
			this.updateShowVisionProperty();
			break;
		case "visionRadius":
			this.updateVisionRadiusProperty();
			break;
		case "visionRange":
			this.updateVisionRangeProperty();
			break;
		case "moveSpeed":
			this.updateMoveSpeedProperty();
			break;
		case "shouldEat":
			this.updateShouldEatProperty();
			break;
		case "showSynchronizedVision":
			this.updateShowSynchronizedVisionProperty();
			break;
	}
}

FishObject.prototype.updateShowVisionProperty = function() {
	this.vision.visible = this.piece.properties['showVision'];
}

FishObject.prototype.updateVisionRadiusProperty = function() {
	this.updateVisionProperties();
	this.updateShowSynchronizedVisionProperty();
}

FishObject.prototype.updateVisionRangeProperty = function() {
	this.updateVisionProperties();
	var objectSize = this.threeObject.userData.size;
	// Joga para a origem do peixe
	this.vision.position.z = 0;
	// Joga para a frente do peixe
	var visionRange = this.piece.properties['visionRange'];
	this.vision.translateY((visionRange / 2) + (objectSize.z / 2));
	this.updateShowSynchronizedVisionProperty();
}

FishObject.prototype.updateVisionProperties = function() {
	var visionRadius = this.piece.properties['visionRadius'];
	var visionRange = this.piece.properties['visionRange'];
	this.vision.geometry = new THREE.CylinderGeometry(visionRadius, 1, visionRange, 4, 4, false);
}

FishObject.prototype.updateMoveSpeedProperty = function() {
	this.moveSpeed = this.piece.properties['moveSpeed'];
	this.deltaRotation = this.moveSpeed * (Math.PI / 180);
}

FishObject.prototype.updateShouldEatProperty = function() {
	this.shouldEat = this.piece.properties['shouldEat'];
}

FishObject.prototype.updateShowSynchronizedVisionProperty = function() {
	var showSynchronizedVision = this.piece.properties['showSynchronizedVision'];
	if(showSynchronizedVision) {
		this.camera.far = this.piece.properties['visionRange'];
		this.camera.fov = this.piece.properties['visionRadius'];
	} else {
		this.camera.far = 4000;
		this.camera.fov = 45;
	}
	this.camera.updateProjectionMatrix();
}

FishObject.prototype.getMoveSpeed = function() {
	return this.moveSpeed * Game.apiHandler.properties['speedMultiplier'];
}

FishObject.prototype.storeReasonerMessage = function(message) {
	if(this.lastMessage !== message) { // Não fica repetindo as mensagens para não perder performance
		this.reasonerMessages = this.reasonerMessages.concat(message);
		this.lastMessage = message;
		if(Game.apiHandler.selectedFish && this == Game.apiHandler.selectedFish) {
			$('#messages-area').val(this.reasonerMessages);
			var textarea = document.getElementById('messages-area');
			textarea.scrollTop = textarea.scrollHeight;
		}
	}
}

FishObject.prototype.getTimeSpeedMultiplier = function() {
	var speedMultiplier = Math.round(Game.apiHandler.properties['speedMultiplier']);
	if(speedMultiplier == 0) {
		speedMultiplier = 1;
	} else {
		if(speedMultiplier < 0) {
			speedMultiplier *= -1;
		}
	}
	return speedMultiplier;
}

FishObject.prototype.getDeltaRotation = function() {
	var direction = 1;
	if(this.deltaRotation < 0) {
		direction = -1;
	}
	
	return this.getMoveSpeed() * (Math.PI / 180) * direction;
}

/**
* Retorna a tag deste objeto.
*
* @author Kevin Eduard Piske
* @method getTag
* @return {String} tag
*/
FishObject.prototype.getTag = function(){
	return "FISH_OBJECT";
}