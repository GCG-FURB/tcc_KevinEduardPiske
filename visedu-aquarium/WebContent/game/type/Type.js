function Type() {}

Type.prototype.init = function(connector, clazz, id, name, treeBehavior, graphicalBehavior) {
	this.connector = connector;
	this.clazz = clazz;
	this.name = name;
	this.id = id;
	this.count = 0;
	this.treeBehavior = treeBehavior;
	this.graphicalBehavior = graphicalBehavior;
	return this;
}