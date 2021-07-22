function ThreeJSTranslateComponent() {}

ThreeJSTranslateComponent.prototype = new TranslateComponent();


/**
* Método construtor da classe TranslateComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {TranslateComponent} object
*/
JSUtils.addMethod(ThreeJSTranslateComponent.prototype, "initialize", 
	function(translatePoint){
		this.initialize();
		this.translatePoint = translatePoint;
		return this;
	}
);

/**
* Define a translação do objeto.
*
* @author Marcos Harbs
* @method setTranslate
* @param {Float} x
* @param {Float} y
*/
ThreeJSTranslateComponent.prototype.setTranslate = function(x, y, z){
	this.translatePoint = new THREE.Vector3(x, y, z);
	this.applied = false;
	if(this.owner.body){
		if(this.owner instanceof PolygonObject){
			this.owner.body.m_shapeList.m_body.m_position.x += this.translatePoint.x;
			this.owner.body.m_shapeList.m_body.m_position.y += this.translatePoint.y;
		}else{
			this.owner.body.m_position.x += this.translatePoint.x;
			this.owner.body.m_position.y += this.translatePoint.y;
		}
		this.applied = true;
	}
	this.doTranslate();
}

ThreeJSTranslateComponent.prototype.doTranslate = function() {
	this.owner.threeObject.position.set(
			this.translatePoint.x + this.owner.getCenterX(), 
			this.translatePoint.y + this.owner.getCenterY(), 
			this.translatePoint.z + this.owner.getCenterZ());
}

ThreeJSTranslateComponent.prototype.addGameComponent = function() {
	this.doTranslate();
}

ThreeJSTranslateComponent.prototype.apply = function(vector) {
	var object = this.owner.threeObject;
	var mt = new THREE.Matrix4();
	mt.makeTranslation(vector.x||0, vector.y||0, vector.z||0);
	object.matrix.multiply(mt);
}