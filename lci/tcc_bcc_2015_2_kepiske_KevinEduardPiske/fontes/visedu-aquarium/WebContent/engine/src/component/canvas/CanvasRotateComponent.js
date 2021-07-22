function CanvasRotateComponent() {}

CanvasRotateComponent.prototype = new RotateComponent();

/**
* Método construtor da classe CanvasRotateComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} angle 
* @return {RotateComponent} object
*/
JSUtils.addMethod(CanvasRotateComponent.prototype, "initialize", 
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
CanvasRotateComponent.prototype.setRotate = function(angle){
	this.angle = angle;
	if(this.owner.body){
		if(this.owner instanceof PolygonObject){
			this.owner.body.m_shapeList.m_body.m_rotation = angle;
		}else{
			this.owner.body.m_rotation = angle;
		}
	}
}

CanvasRotateComponent.prototype.onBeforeRender = function(context){
	this.rotate(context);
}

/**
* Retorna o ângulo do objeto.
*
* @author Marcos Harbs
* @method getAngle
* @return {Float} angle
*/
CanvasRotateComponent.prototype.getAngle = function(){
	if(!this.owner.body || this.owner.body == null){
		return this.angle;
	}
	if(this instanceof PolygonObject){
		return this.owner.body.m_shapeList.m_body.m_rotation;
	}
	return this.owner.body.m_rotation;
}

/**
* Função que realiza a transformação de rotação no canvas.
*
* @author Marcos Harbs
* @method rotate
* @param {Context} context
*/
CanvasRotateComponent.prototype.rotate = function(context){
	if(!(this.owner instanceof PolygonObject) || !this.owner.body){
		context.translate(this.owner.getCenterX(), this.owner.getCenterY());
		context.rotate(this.owner.getAngle());
		context.translate(-this.owner.getCenterX(), -this.owner.getCenterY());
	}
}