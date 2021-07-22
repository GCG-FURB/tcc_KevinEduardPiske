/**
* Classe que representa um objeto do tipo aquarium.
*
* @author Kevin Eduard Piske
* @class AquariumObject
* @constructor
*/
function AquariumObject(){}

AquariumObject.prototype = new GameObject();

/**
* Método construtor da classe AquariumObject.
*
* @author Kevin Eduard Piske
* @method initialize
* @param {Component} component
* @param {Piece} piece 
* @return {FishObject} object
*/
JSUtils.addMethod(AquariumObject.prototype, "initialize", 
	function(component, piece){
		this.initialize(0, 0, 0, 0, 0, 0); // Sem importância os valores aqui
		ComponentUtils.addComponent(this, this.component = component);
		this.piece = piece;
		this.type = this.piece.type;
		this.name = this.piece.properties['name'];
		this.lastTime = Date.now();
		this.lastTimeBubbles = Date.now();
		this.colorLevel = [0x40ffdf, 0x40eedf, 0x40dddf, 0x40ccdf, 0x40bbdf, 0x40aadf, 0x4099df, 0x4088df, 0x4077df, 0x4066df, 0x4055df];
		this.currentColorLevel = 0;
		this.aquariumFront = this.threeObject.children[2];
		this.aquariumBack = this.threeObject.children[3];
		this.bubbleCount = 0;
		this.bubbleAnimationSpeed = 0.3;
		this.bubbleSound = new Audio('./resources/sounds/bubbleSound.mp3');
		return this;
	}
);

AquariumObject.prototype.update = function(objectsMap) {
	if(Game.apiHandler.properties['speedMultiplier'] != 0) {
		var currentTime = Date.now();
		if(this.bubbleCount < 20 && currentTime > (this.lastTimeBubbles + (3000 / this.getTimeSpeedMultiplier()))) {
			this.createBubble();
			//this.bubbleSound.play(); //TODO Ativa som de bolha
			this.lastTimeBubbles = Date.now();
		}
		this.animateBubbles();
		if(currentTime > (this.lastTime + (20000 / this.getTimeSpeedMultiplier()))) {
			var currentSardineCount = Game.apiHandler.sardineCount;
			var currentSardineHalfCount = currentSardineCount / 2;
			this.updateColorLevel(currentSardineCount, currentSardineHalfCount);
			this.verifyProcreation(currentSardineCount, currentSardineHalfCount);
			this.lastTime = currentTime;
		}
	}
}

AquariumObject.prototype.updateColorLevel = function(currentSardineCount, currentSardineHalfCount) {
	if(Math.round(currentSardineCount / 1.5) > this.currentColorLevel && this.currentColorLevel < 10) {
		this.currentColorLevel++;
	} else {
		if(Math.round(currentSardineCount / 1.5) < this.currentColorLevel && this.currentColorLevel > 0) {
			this.currentColorLevel--;
		}
	}
	this.aquariumFront.material.color.setHex(this.colorLevel[this.currentColorLevel]);
	this.aquariumBack.material.color.setHex(this.colorLevel[this.currentColorLevel]);
}

AquariumObject.prototype.verifyProcreation = function(currentSardineCount, currentSardineHalfCount) {
	this.verifySardineProcreation(currentSardineCount, currentSardineHalfCount);
	this.verifySharkProcreation();
}

AquariumObject.prototype.verifySardineProcreation = function(currentSardineCount, currentSardineHalfCount) {
	if(currentSardineCount > 1 && currentSardineCount < 15) {
		if(currentSardineCount % 2 == 1) {
			currentSardineHalfCount--;
		}
		for(var i = 0; i < currentSardineHalfCount; i++) {
			if(currentSardineCount + i > 14) {
				break;
			}
			this.addSardine();
		}
	}
}

AquariumObject.prototype.verifySharkProcreation = function() {
	var currentSharkCount = Game.apiHandler.sharkCount;
	if(currentSharkCount > 1 && currentSharkCount < 4 && Game.apiHandler.sardineEatenCount >= 5) {
		this.addShark()
		Game.apiHandler.sardineEatenCount = 0;
	}
}

AquariumObject.prototype.animateBubbles = function() {
	var gameObject = this;
	var bubbleSound = this.bubbleSound;
	$.each(this.threeObject.children, function(index, value){
		if(value.name === "bubble") {
			value.translateY(gameObject.getBubbleAnimationSpeed());
			if(value.position.y > 65) {
				var positionX = (Math.floor((Math.random() * 120) - 60)); // de -60 a 60
				var positionZ = (Math.floor((Math.random() * 120) - 60)); // de -60 a 60
				value.position.x = positionX;
				value.position.z = positionZ;
				value.position.y = -50;
				//bubbleSound.play(); //TODO Ativa som de bolha
			} else {
				if(Game.apiHandler.properties['speedMultiplier'] < 0 && value.position.y < -50){
					var positionX = (Math.floor((Math.random() * 120) - 60)); // de -60 a 60
					var positionZ = (Math.floor((Math.random() * 120) - 60)); // de -60 a 60
					value.position.x = positionX;
					value.position.z = positionZ;
					value.position.y = 65;
					//bubbleSound.play(); //TODO Ativa som de bolha
				}
			}
		}
	});
}

AquariumObject.prototype.createBubble = function() {
	var diameter = (Math.random() / 2) + 0.1;
	var bubbleGeometry = new THREE.SphereGeometry(diameter, 5, 5);
	var materialBubble = new THREE.MeshLambertMaterial( { color: 0xffffff, transparent: false } );
	var bubble = new THREE.Mesh( bubbleGeometry, materialBubble );
	var positionX = (Math.floor((Math.random() * 100) - 50)); // de -50 a 50
	var positionZ = (Math.floor((Math.random() * 100) - 50)); // de -50 a 50
	bubble.position.x = positionX;
	bubble.position.z = positionZ;
	bubble.position.y = -50;
	bubble.name = "bubble";
	
	this.threeObject.add(bubble);
	this.bubbleCount++;
}

AquariumObject.prototype.addSardine = function() {
	var newPiece = new SardinePiece();
	DragAndDropController.setupDroppables(newPiece);
	var droppable = $('.piece.resting.element.connector.' + newPiece.type.connector + '.ui-droppable:not(.busy)');
	var last = droppable.last();
	newPiece.type.treeBehavior.addPiece(droppable, newPiece);
	DragAndDropController.fitTree();
}

AquariumObject.prototype.addShark = function() {
	var newPiece = new SharkPiece();
	DragAndDropController.setupDroppables(newPiece);
	var droppable = $('.piece.resting.element.connector.' + newPiece.type.connector + '.ui-droppable:not(.busy)');
	var last = droppable.last();
	newPiece.type.treeBehavior.addPiece(droppable, newPiece);
	DragAndDropController.fitTree();
}

AquariumObject.prototype.getBubbleAnimationSpeed = function() {
	return this.bubbleAnimationSpeed * Game.apiHandler.properties['speedMultiplier'];
}

AquariumObject.prototype.updateProperty = function(property) {
	switch (property.key) {
		case "perception":
			this.updatePerceptionProperty();
			break;
	}
}

AquariumObject.prototype.updatePerceptionProperty = function() {
	Game.apiHandler.percept = this.piece.properties['perception'];
}

AquariumObject.prototype.getTimeSpeedMultiplier = function() {
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

/**
* Retorna a tag deste objeto.
*
* @author Kevin Eduard Piske
* @method getTag
* @return {String} tag
*/
AquariumObject.prototype.getTag = function(){
	return "AQUARIUM_OBJECT";
}