/**
* Component que renderiza uma imagem.
*
* @author Marcos Harbs
* @class ImageRenderComponent
* @constructor
*/
function ImageRenderComponent(){}

ImageRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe ImageRenderComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Image} image
* @return {ImageRenderComponent} object
*/
JSUtils.addMethod(ImageRenderComponent.prototype, "initialize", 
	function(image, repeat, direction){
		this.initialize();
		this.image = image;
		if(repeat){
			this.repeat = repeat;
		}else{
			this.repeat = false;
		}
		if(direction){
			this.direction = direction;
		}else{
			this.direction = "HORIZONTAL";
		}
		return this;
	}
);

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
ImageRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
ImageRenderComponent.prototype.onRender = function(context){
	if(this.repeat && this.image.width > 0 && this.image.height > 0){
		var repeatCount = 0;
		if(this.direction == "HORIZONTAL"){
			repeatCount = this.owner.getWidth() / this.image.width;
		}else if(this.direction == "VERTICAL"){
			repeatCount = this.owner.getHeight() / this.image.height;
		}
		for(var i=0; i<repeatCount; i++){
			if(this.direction == "HORIZONTAL"){
				context.drawImage(this.image, 
		                          this.owner.getCenterX()-(this.owner.getWidth()/2) + (this.image.width*i), 
		                          this.owner.getCenterY()-(this.owner.getHeight()/2));
			}else if(this.direction == "VERTICAL"){
				context.drawImage(this.image, 
		                          this.owner.getCenterX()-(this.owner.getWidth()/2), 
		                          this.owner.getCenterY()-(this.owner.getHeight()/2) + (this.image.height*i));
			}
		}
	}else{
		context.drawImage(this.image, 
		                  this.owner.getCenterX()-(this.owner.getWidth()/2), 
		                  this.owner.getCenterY()-(this.owner.getHeight()/2));
	}
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
ImageRenderComponent.prototype.getTag = function(){
	return "IMAGE_RENDER_COMPONENT";
}


ImageRenderComponent.prototype.genThreeObject = function(){
	var texture = THREE.ImageUtils.loadTexture(this.image.src);
	texture.wrapS = THREE.RepeatWrapping; 
	texture.wrapT = THREE.RepeatWrapping;
	
	texture.repeat.set(1, 1);
	
	var material = new THREE.MeshLambertMaterial({
        map:texture,
        transparent: true
      });
	var image = new THREE.Mesh(new THREE.PlaneGeometry(this.owner.getWidth(), this.owner.getHeight()), material);
    return image;
}