// the name was simplified

var Menu = function(){
	this.entry = function(){
		scopeObjects.gameName.draw();
		positioning.centerXY(scopeObjects.gameName);
	}

	this.update = function(){
		// rendering game name
		scopeObjects.gameMenu.draw();
		//
	}

	this.exit = function(){
		
	}
}