/**
* Classe que representa um objeto do tipo circle.
*
* @author Marcos Harbs
* @class CircleObject
* @constructor
*/
function CircleObject(){}

CircleObject.prototype = new GameObject();
CircleObject.prototype.$initialize = CircleObject.prototype.initialize;
/**
* Método construtor da classe CircleObject.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Float} radius 
* @param {String} fillStyle 
* @param {String} fillStroke 
* @return {CircleObject} object
*/
CircleObject.prototype.initialize = function(x, y, z, radius, fillStyle, fillStroke){
	this.$initialize(x, y, 0);
	this.radius = radius;
	ComponentUtils.addComponent(this, new CircleRenderComponent().initialize(fillStyle, fillStroke));
	ComponentUtils.addComponent(this, Game.componentFactory.getScaleComponent());
	ComponentUtils.addComponent(this, Game.componentFactory.getTranslateComponent());
	ComponentUtils.addComponent(this, Game.componentFactory.getRotateComponent());
	return this;
}

/**
* Cria o formato do corpo para a Box2D.
*
* @author Marcos Harbs
* @method createBodyShape
* @return {b2ShapeDef} bodyShape
*/
CircleObject.prototype.createBodyShape = function(){
	var shape = new b2CircleDef();
	var rb = this.radius;
	var scale = ComponentUtils.getComponent(this, "SCALE_COMPONENT");
	if(scale){
		rb = this.radius * Math.abs(scale.scalePoint.x);
	}
	shape.radius = rb;
	return shape;
}

/**
* Retorna o raio da circunferência.
*
* @author Marcos Harbs
* @method getRadius
* @return {Float} radius
*/
CircleObject.prototype.getRadius = function(){
	return this.radius;
}

/**
* Retorna a tag deste objeto.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
CircleObject.prototype.getTag = function(){
	return "CIRCLE_OBJECT";
}