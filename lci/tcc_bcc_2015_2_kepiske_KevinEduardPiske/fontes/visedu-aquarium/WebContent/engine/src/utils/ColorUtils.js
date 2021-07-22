var ColorUtils = new function() {
	
	this.checkColor = function(color) {
		var ret;
		var defaultColor = 0x000000;
		if (!color) {
			ret = defaultColor;
		} else if(typeof color == 'string') {
			console.log('[checkColor] não foi possível validar a cor "'
					+color+'". Informe a mesma em formato Hexadecimal.');
			ret = defaultColor;
		} else {
			ret = color;
		}
		return ret;
	}
	
}