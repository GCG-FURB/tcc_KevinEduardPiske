	/**
* Classe responsável por propagar os eventos de renderização de objetos.
*
* @author Marcos Harbs
* @class RenderSystem
* @static
*/
var RenderSystem = new function(){

	this.clearCanvas = true;

	/**
	* Método usado para propagar o evento de render.
	*
	* @author Marcos Harbs
	* @method fireRenderListener
	* @static
	* @param {Context} context
	*/
	this.fireRenderListener = function(context){
		Game.apiHandler.beforeRender();
		Game.apiHandler.onRender(context);
	}

	/**
	* Retorna o tipo do sistema.
	*
	* @author Marcos Harbs
	* @method getTag
	* @static
	* @return {String} tag
	*/
	this.getTag = function(){
		return "RENDER_SYSTEM";
	}

	this.getListName = function(){
		return "listComponentsRender";
	}

}