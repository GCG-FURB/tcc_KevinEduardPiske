function ThreeJSRotateComponent() {}

ThreeJSRotateComponent.prototype = new RotateComponent();

/**
* Método construtor da classe ThreeJSRotateComponent.
*
* @author William FK
* @method initialize
* @param {Float} angle 
* @return {RotateComponent} object
*/
JSUtils.addMethod(ThreeJSRotateComponent.prototype, "initialize", 
	function(angle){
		this.initialize();
		this.angle = angle;
		return this;
	}
);

/**
* Define a rotação do objeto.
*
* @author Marcos Harbs
* @method setRotate
* @param {Float} angle
*/
ThreeJSRotateComponent.prototype.setRotate = function(x, y, z){
	this.angle = new THREE.Vector3(x, y, z);
	var z = angle.z
	if(this.owner.body && z){
		if(this.owner instanceof PolygonObject){
			this.owner.body.m_shapeList.m_body.m_rotation = z;
		}else{
			this.owner.body.m_rotation = z;
		}
	}
	this.doRotate();
}

ThreeJSRotateComponent.prototype.doRotate = function() {
	this.owner.threeObject.rotation.set(
			MathUtils.angleToRads(this.angle.x),
			MathUtils.angleToRads(this.angle.y),
			MathUtils.angleToRads(this.angle.z)
	);
}

/**
* Retorna o ângulo do objeto.
*
* @author Marcos Harbs
* @method getAngle
* @return {Float} angle
*/
ThreeJSRotateComponent.prototype.getAngle = function(){
	if(!this.owner.body || this.owner.body == null){
		return this.angle.z;
	}
	if(this instanceof PolygonObject){
		return this.owner.body.m_shapeList.m_body.m_rotation;
	}
	return this.owner.body.m_rotation;
}

/**
 * Retorna o ângulo do objeto.
 *
 * @author William Fernandes Koehler
 * @method getAngle
 */
ThreeJSRotateComponent.prototype.getAngleXYZ = function(){
	if(!this.owner.body || this.owner.body == null){
		return this.angle;
	}
	if(this instanceof PolygonObject){
		angle.z = this.owner.body.m_shapeList.m_body.m_rotation;
		return angle;
	}
	angle.z = this.owner.body.m_rotation;
	return angle;
}

ThreeJSRotateComponent.prototype.onLoad = function() {
	this.doRotate();
}

ThreeJSRotateComponent.prototype.apply = function(vector) {
	var object = this.owner.threeObject;
	var clone = object.matrix.clone();
	var x = vector.x;
	var y = vector.y;
	var z = vector.z;

	if (x) {
		rx = new THREE.Matrix4();
		rx.makeRotationX(MathUtils.angleToRads(x));
		object.matrix.multiply(rx);
	}
	
	if (y) {
		ry = new THREE.Matrix4();
		ry.makeRotationY(MathUtils.angleToRads(y));
		object.matrix.multiply(ry);
	}
	
	if (z) {
		rz = new THREE.Matrix4();
		rz.makeRotationZ(MathUtils.angleToRads(z));
		object.matrix.multiply(rz);
	}
}