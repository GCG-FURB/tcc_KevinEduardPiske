function LinesRenderComponent(){}

LinesRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe LinesRenderComponent.
*
* @author William KF
* @method initialize
* @param {Color} fillStyle
* @return {LinesRenderComponent} object
*/
JSUtils.addMethod(LinesRenderComponent.prototype, "initialize", 
	function(fillStyle){
		this.initialize();
		this.fillStyle = fillStyle;
		return this;
	}
);

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author William FK
* @method getSystems
* @return {Array} systems
*/
LinesRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author William FK
* @method getTag
* @return {String} tag
*/
LinesRenderComponent.prototype.getTag = function(){
	return "LINES_RENDER_COMPONENT";
}

LinesRenderComponent.prototype.genThreeObject = function(){
	var material = Game.apiHandler.getLineMaterial(this.fillStyle)
	
	var geometry = new THREE.Geometry();
	var points = this.owner.getPoints();
	if (points)  {
		$.each(points, function(index, item) {
			geometry.vertices.push(new THREE.Vector3(item.x, item.y, item.z || 0));		
		});		
	}
	
	lines = new THREE.Line(geometry, material);
	return lines;
}