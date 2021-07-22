var ThreeUtils = new function() {
	
	this.updateMaterials = function() {
		var root = Game.scene.threeObject;
		ThreeUtils._updateMaterials(root);
	}
	
	this._updateMaterials = function (obj) {
		if (obj instanceof THREE.Object3D) {
			if (obj.material) {
				obj.material.needsUpdate = true;
			}
			if (obj.children) {
				$.each(obj.children, function(index, item) {
					ThreeUtils._updateMaterials(item);
				});
			}
		}
	}
	
	this.isChildrenOf = function (obj, parent) {
		var ret;
		if (obj) {
			ret = obj === parent ||
			this.isChildrenOf(obj.object, parent) ||
			this.isChildrenOf(obj.parent, parent)			
		} else {
			ret = false;
		}
		return ret;
	}
	
	var onProgress = function (xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};
	
	var onError = function (xhr) {
		
	};
	
}