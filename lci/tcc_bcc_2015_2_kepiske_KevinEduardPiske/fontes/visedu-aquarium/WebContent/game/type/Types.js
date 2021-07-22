var Types = new function() {
	var treeDNDBehavior = new TreeDNDBehavior();
	var treePluralDNDBehavior = new TreePluralDNDBehavior();
	var treeObjectDNDBehavior =  new TreeObjectDNDBehavior();
	var treeRenderDNDBehavior =  new TreeRenderDNDBehavior();
	var treeAquariumDNDBehavior = new TreeAquariumDNDBehavior();

	var elementGraphicalBehavior = new ElementGraphicalBehavior(); 
	var groupGraphicalBehavior = new GroupGraphicalBehavior(); 
	
	this.typeShark = new Type().init('arrow', 'fish', 'shark', 'Tubarão', treePluralDNDBehavior, elementGraphicalBehavior);
	this.typeSardine = new Type().init('arrow', 'fish', 'sardine', 'Sardinha', treePluralDNDBehavior, elementGraphicalBehavior);
	this.typeAquarium = new Type().init('cross', 'aquarium', 'aquarium', 'Aquário', treeAquariumDNDBehavior, groupGraphicalBehavior);
	
	this.typeRenderer = new Type().init('', 'renderer', 'renderer', 'Mundo', treeRenderDNDBehavior);

	this.typeConnectorCross = new Type().init('cross', 'connector');
	this.typeConnectorArrow = new Type().init('arrow', 'connector');
	this.typeConnectorSquare = new Type().init('square', 'connector');
	this.typeConnectorDiamond = new Type().init('diamond', 'connector');
	
}