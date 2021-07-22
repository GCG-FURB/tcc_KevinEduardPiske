function CanvasTranslateComponent() {}

CanvasTranslateComponent.prototype = new TranslateComponent();


/**
* Método construtor da classe TranslateComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {TranslateComponent} object
*/
JSUtils.addMethod(CanvasTranslateComponent.prototype, "initialize", 
	function(x, y){
		this.initialize();
		this.translatePoint = new Point2D().initialize(x, y);
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
CanvasTranslateComponent.prototype.setTranslate = function(x, y){
	this.translatePoint.x = x;
	this.translatePoint.y = y;
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
}

/**
* Função que realiza a transformação de translação no canvas.
*
* @author Marcos Harbs
* @method translate
* @param {Context} context
*/
CanvasTranslateComponent.prototype.translate = function(context){
	if(!this.owner.body){
		context.translate(this.owner.getCenterX(), this.owner.getCenterY());
		context.translate(this.translatePoint.x, this.translatePoint.y);
		context.translate(-this.owner.getCenterX(), -this.owner.getCenterY());
	}
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onBeforeRender
* @param {Context} context
*/
CanvasTranslateComponent.prototype.onBeforeRender = function(context){
	this.translate(context);
}
