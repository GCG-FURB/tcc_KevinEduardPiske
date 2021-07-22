/**
* Classe que representa uma câmera.
*
* @author Marcos Harbs
* @class Camera
* @constructor
*/
function Camera(){}

/**
* Método construtor da classe Camera.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y
* @return {Camera} object
*/
JSUtils.addMethod(Camera.prototype, "initialize", 
	function(x, y, z, aspect, angle, near, far, looktat){
		this.centerPoint = new Point3D().initialize(x, y, z);
		ComponentUtils.addComponent(this, new CameraComponent().initialize(aspect, angle, near, far, looktat));

		this.translate = Game.componentFactory.getTranslateComponent();
		this.scale = Game.componentFactory.getScaleComponent();
		this.rotate = Game.componentFactory.getRotateComponent();

		ComponentUtils.addComponent(this, this.scale);
		ComponentUtils.addComponent(this, this.translate);
		ComponentUtils.addComponent(this, this.rotate);
		return this;
	}
);

/**
* Função que defini a escala da câmera.
*
* @author Marcos Harbs
* @method setScale
* @param {Float} x
* @param {Float} y
*/
Camera.prototype.setScale = function(x, y, z){
	this.scale.setScale(x||1, y||1, z||1);
}

/**
* Função que defini a translação da câmera.
*
* @author Marcos Harbs
* @method setTranslate
* @param {Float} x
* @param {Float} y
*/
Camera.prototype.setTranslate = function(x, y){
	this.translate.setTranslate(x, y, z);
}

/**
* Função que retorna o x central da câmera.
*
* @author Marcos Harbs
* @method getCenterX
* @return {Float} centerX
*/
Camera.prototype.getCenterX = function(){
	return this.centerPoint.x;
}

/**
* Função que retorna o y central da câmera.
*
* @author Marcos Harbs
* @method getCenterY
* @return {Float} centerY
*/
Camera.prototype.getCenterY = function(){
	return this.centerPoint.y;
}

/**
 * Função que retorna o z central da câmera.
 *
 * @author William FK
 * @method getCenterY
 * @return {Float} centerY
 */
Camera.prototype.getCenterZ = function(){
	return this.centerPoint.z;
}

/**
* Função que retorna o ângulo da câmera.
*
* @author Marcos Harbs
* @method getAngle
* @return {Float} angle
*/
Camera.prototype.getAngle = function(){
	if(this.rotate){
		return this.rotate.getAngle();
	}
	return 0;
}

/**
 * Função que define a posição a se olhar
 *
 * @author William FK
 * @method getAngle
 * @return {Float} angle
 */
Camera.prototype.setLookAt = function(v3LookAt){
	this.v3LookAt = v3LookAt; 
}