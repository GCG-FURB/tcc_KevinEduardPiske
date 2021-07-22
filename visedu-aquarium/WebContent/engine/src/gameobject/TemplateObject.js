/**
* Classe que representa um objeto do tipo box.
*
* @author Marcos Harbs
* @class BoxObject
* @constructor
*/
function TemplateObject(){}

TemplateObject.prototype = new GameObject();

/**
* Método construtor da classe BoxObject.
*
* @author William FK
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Float} z 
* @param {Float} width
* @param {Float} height  
* @param {Float} depth  
* @param {Component} component
* @param {String} tag
* @return {TamplateObject} object
*/
JSUtils.addMethod(TemplateObject.prototype, "initialize", 
	function(x, y, z, width, height, depth, component, tag){
		this.initialize(x, y, z, width, height, depth);
		if (tag) {
			this.tag = tag;
		} else {
			this.tag = "TEMPLATE_OBJECT";
		}
		ComponentUtils.addComponent(this, this.component = component);
		ComponentUtils.addComponent(this, this.translateComponent = Game.componentFactory.getTranslateComponent());
		ComponentUtils.addComponent(this, this.scaleComponent = Game.componentFactory.getScaleComponent());
		ComponentUtils.addComponent(this, this.rotateComponent = Game.componentFactory.getRotateComponent());
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
TemplateObject.prototype.getTag = function(){
	return this.tag;
}