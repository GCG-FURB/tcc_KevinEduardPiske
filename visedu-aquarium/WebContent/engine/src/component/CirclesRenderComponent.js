function CirclesRenderComponent(){}

CirclesRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe PolygonRenderComponent.
*
* @author William KF
* @method initialize
* @param {Color} fillStyle
* @return {CirclesRenderComponent} object
*/
JSUtils.addMethod(CirclesRenderComponent.prototype, "initialize", 
	function(fillStyle, radius){
		this.initialize();
		this.radius = radius;
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
CirclesRenderComponent.prototype.getSystems = function(){
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
CirclesRenderComponent.prototype.getTag = function(){
	return "CIRCLES_RENDER_COMPONENT";
}

CirclesRenderComponent.prototype.genThreeObject = function(){
	var material = Game.apiHandler.getBasicMaterial(this.fillStyle)
	var group = new THREE.Group();
	
	var geometry = new THREE.CircleGeometry( this.radius, 32);
	var points = this.owner.getPoints();
	if (points)  {
		$.each(points, function(index, item) {
			point = new THREE.Mesh(geometry, material);
			point.position.set(item.x, item.y, item.z);
			group.add(point);
		});		
	}
	
	return group;
}