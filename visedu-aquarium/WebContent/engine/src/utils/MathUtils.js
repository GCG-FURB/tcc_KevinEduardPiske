var MathUtils = new function () {
	
	this.radsToAngle = function(rads) {
		return rads * 180 / Math.PI;
	}
	
	this.angleToRads = function(angle) {
		return angle * Math.PI / 180;
	}
	
}