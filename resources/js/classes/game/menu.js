// the name was simplified

var Menu = function(){
	var self = this;
	this.flag = false;
	this.entry = function(){
		//scopeObjects.gameName.draw(); // game logo 
		positioning.centerXY(scopeObjects.gameName);
		
		var counter = 0;
		for(var i in config.gameMenu){
			counter++;
			//scopeObjects[i].draw();
			positioning.centerX(scopeObjects[i]);
			positioning.pos(scopeObjects[i], 'y', counter * 15);
		}
	}

	this.update = function(){
		// rendering game name
		//scopeObjects.gameMenu.draw();
		
		setTimeout(function(){ // show game logo 1 s
			self.flag = true;
		}, 2500);
		
		if(self.flag){
			for(var i in config.gameMenu){
				scopeObjects[i].draw();
			}
		}else{
			scopeObjects.gameName.draw();
		}
	}

	this.exit = function(){
		
	}
}