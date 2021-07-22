/**
* Classe que representa um objeto do tipo box.
*
* @author Marcos Harbs
* @class BoxObject
* @constructor
*/
function TemplateWithPointsObject(){}

TemplateWithPointsObject.prototype = new TemplateObject();

/**
* Método construtor da classe BoxObject.
*
* @author William FK
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Float} z 
* @param {List<Point>} points  
* @param {Component} component
* @param {String} tag
* @return {TamplateObject} object
*/
JSUtils.addMethod(TemplateWithPointsObject.prototype, "initialize", 
	function(x, y, z, width, height, depth, points, component, tag){
		this.points = points;
		this.initialize(x, y, z, width, height, depth, component, tag);
		return this;
	}
);

/**
* Retorna a tag deste objeto.
*
* @author William FK
* @method getTag
* @return {String} tag
*/
TemplateWithPointsObject.prototype.getTag = function(){
	return this.tag;
}

TemplateWithPointsObject.prototype.getPoints = function(){
	return this.points;
}