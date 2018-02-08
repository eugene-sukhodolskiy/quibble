// the name was simplified

var Menu = function(){
	var self = this;
	this.flag = false;
	this.entry = function(){
		positioning.centerXY(scopeObjects.gameName);
		
		var counter = 0;
		for(var i in config.gameMenu){
			counter++;
			positioning.centerX(scopeObjects[i]);
			positioning.pos(scopeObjects[i], 'y', counter * 15);
		}
	}

	this.update = function(){
		// rendering game name
		// 
		setTimeout(function(){ // show game logo 1 s
			self.flag = true;
		}, 2500);
		
		if(self.flag){
			for(var i in config.gameMenu){
				scopeObjects[i].draw(); //
			}

			// this.test = scopeObjects.generatePiecesBehindMenu;
			// this.test.draw();
			
			//
		// var obj = game.newRectObject({ 
		//      x : 100, 
		//      y : 100, 
		//      w : 50, 
		//      h : 50, 
		//      fillColor : "#FBFE6F", 
		// });
		// var piece = pjs.game.newRectObject(obj);
		// piece.draw();
		}else{
			scopeObjects.gameName.draw();
		}
	}

	this.exit = function(){
		
	}
}