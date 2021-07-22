function CanvasScaleComponent() {}

CanvasScaleComponent.prototype = new ScaleComponent();

/**
* Método construtor da classe ScaleComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {ScaleComponent} object
*/
JSUtils.addMethod(CanvasScaleComponent.prototype, "initialize", 
	function(x, y){
		this.initialize();
		this.scalePoint = new Point2D().initialize(x, y);
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
CanvasScaleComponent.prototype.setScale = function(x, y){
	this.scalePoint.x = x;
	this.scalePoint.y = y;
	this.owner.recreateBody = true;
}

CanvasScaleComponent.prototype.onBeforeRender = function(context){
	this.scale(context);
}

/**
* Função que realiza a transformação escala no canvas.
*
* @author Marcos Harbs
* @method scale
* @param {Context} context
*/
CanvasScaleComponent.prototype.scale = function(context){
	if(!(this.owner instanceof PolygonObject) || !this.owner.body){
		context.translate(this.owner.getCenterX(), this.owner.getCenterY());
		context.scale(this.scalePoint.x, this.scalePoint.y);
		context.translate(-this.owner.getCenterX(), -this.owner.getCenterY());
	}
}
