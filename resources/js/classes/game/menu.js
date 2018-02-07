// the name was simplified

var Menu = function(){
	var self = this;
	this.entry = function(){
		// scopeObjects.gameName.draw();
		// positioning.centerXY(scopeObjects.gameName);
		for(var i in config.gameMenu){
			scopeObjects[i].draw();
			positioning.centerX(scopeObjects[i]);
		}
	}

	this.update = function(){
		// rendering game name
		// scopeObjects.gameMenu.draw();
		for(var i in config.gameMenu){
			scopeObjects[i].draw();
		}
	}

	this.exit = function(){
		
	}
}