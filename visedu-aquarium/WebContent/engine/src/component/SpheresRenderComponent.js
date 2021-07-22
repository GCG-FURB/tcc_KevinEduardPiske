function SpheresRenderComponent(){}

SpheresRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe PolygonRenderComponent.
*
* @author William KF
* @method initialize
* @param {Color} fillStyle
* @return {SpheresRenderComponent} object
*/
JSUtils.addMethod(SpheresRenderComponent.prototype, "initialize", 
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
SpheresRenderComponent.prototype.getSystems = function(){
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
SpheresRenderComponent.prototype.getTag = function(){
	return "SPHERES_RENDER_COMPONENT";
}

SpheresRenderComponent.prototype.genThreeObject = function(){
	var material = Game.apiHandler.getBasicMaterial(this.fillStyle)
	var group = new THREE.Group();
	
	var geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
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