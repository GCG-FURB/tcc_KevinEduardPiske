function SplineRenderComponent(){}

SplineRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe PolygonRenderComponent.
*
* @author William KF
* @method initialize
* @param {Color} fillStyle
* @return {SplineRenderComponent} object
*/
JSUtils.addMethod(SplineRenderComponent.prototype, "initialize", 
	function(numPoints, color, enablePolyhedron, polyhedronColor){
		this.initialize();
		this.numPoints = numPoints;
		this.color = color;
		this.enablePolyhedron = enablePolyhedron;
		this.polyhedronColor = polyhedronColor;
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
SplineRenderComponent.prototype.getSystems = function(){
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
SplineRenderComponent.prototype.getTag = function(){
	return "SPLINE_RENDER_COMPONENT";
}

SplineRenderComponent.prototype.genThreeObject = function(){
	var group = new THREE.Group();
	var points = this.owner.getPoints();
	
	if (this.enablePolyhedron) {
		var geometry = new THREE.Geometry();
		
		geometry.vertices = points;
		geometry.computeLineDistances();
								
		var material = new THREE.LineBasicMaterial( { linewidth: 1, color: this.polyhedronColor, transparent: false } );
		var polyhedron = new THREE.Line(geometry, material, THREE.LineStrip);
		group.add(polyhedron);
	}
	
	var curve = new THREE.CubicBezierCurve3( 
			points[0], 
			points[1], 
			points[2], 
			points[3]); 
	var geometry = new THREE.Geometry(); 
	
	geometry.vertices = curve.getPoints( this.numPoints ); 
	var material = new THREE.LineBasicMaterial( { color : this.color } );
	
	var spline = new THREE.Line(geometry, material);
	group.add(spline);
	
	return group;
}