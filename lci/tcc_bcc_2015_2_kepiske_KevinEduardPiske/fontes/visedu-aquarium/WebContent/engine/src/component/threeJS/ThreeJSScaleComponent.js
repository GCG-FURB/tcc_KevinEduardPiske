function ThreeJSScaleComponent() {}

ThreeJSScaleComponent.prototype = new ScaleComponent();

/**
* Método construtor da classe ScaleComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {ScaleComponent} object
*/
JSUtils.addMethod(ThreeJSScaleComponent.prototype, "initialize", 
	function(scalePoint){
		this.initialize();
		this.scalePoint = scalePoint;
		return this;
	}
);

/**
* Define a escala do objeto.
*
* @author Marcos Harbs
* @method setScale
* @param {Float} x
* @param {Float} y
*/
ThreeJSScaleComponent.prototype.setScale = function(x, y, z){
	this.scalePoint = new THREE.Vector3(x, y, z);
	this.owner.recreateBody = true;
	this.doScale();
}

ThreeJSScaleComponent.prototype.doScale = function() {
	this.owner.threeObject.scale.set(this.scalePoint.x, this.scalePoint.y, this.scalePoint.z);
}

ThreeJSScaleComponent.prototype.addGameComponent= function() {
	this.doScale();
}

ThreeJSScaleComponent.prototype.apply = function(vector) {
	var object = this.owner.threeObject;
	var ms = new THREE.Matrix4();
	ms.makeScale(vector.x||0, vector.y||0, vector.z||0);
	object.matrix.multiply(ms);
}
