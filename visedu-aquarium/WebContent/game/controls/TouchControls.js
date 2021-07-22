function TouchControls() {}

TouchControls.prototype.setup = function ( event ) {	
	document.addEventListener( 'dblclick', this.onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
}

TouchControls.prototype.onDocumentTouchStart = function ( event ) {
	
	event.preventDefault();
	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;
	onDocumentMouseDown( event );

}	

TouchControls.prototype.onDocumentMouseDown = function( event ) {

	if (event.button == 0) {
		var renderer = Game.apiHandler.renderer;
		var mouse = new THREE.Vector2();
		mouse.x = ( (event.clientX - 500) / renderer.domElement.width ) * 2 - 1;
		mouse.y = 1 - 2* ( event.clientY / (renderer.domElement.height/2) );
	
		var camera = Game.camera.threeObject;
		
		raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);
		var objects = [];
		
		var elements = $('.piece.component.element.square'); 
		$.each(elements, function(index, item) {
			objects.push($(item).data('piece').gameObject.threeObject);
		});
		
		var intersects = raycaster.intersectObjects( objects, true );
	
		if ( intersects.length > 0 ) {
	
			$.each(elements, function(index, item) {
				var piece = $(item).data('piece');
				if (ThreeUtils.isChildrenOf(intersects[0], piece.gameObject.threeObject)) {
					PiecesController.onPieceClicked(piece.htmlObject[0]);
					return false;
				}
			});
	
		}
	}

}