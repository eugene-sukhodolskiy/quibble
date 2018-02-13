// the name was simplified

var Menu = function(){
	var self = this;
	this.flag = false;
	this.entry = function(){
		positioning.centerXY(scopeObjects.gameName);

		positioning.pos(scopeObjects.bestScore, 'x', 70);
		positioning.pos(scopeObjects.bestScore, 'y', 5);

		var counter = 0;
		for(var i in config.gameMenu){
			counter++;
			positioning.centerX(scopeObjects[i]);
			positioning.pos(scopeObjects[i], 'y', counter * 15);
		}
	}

	this.update = function(){
		scopeObjects.monitorParticles();
		// rendering game name
		// 
		setTimeout(function(){ // show game logo 2.5 s
			self.flag = true;
		}, 2500);
		
		if(self.flag){
			for(var i in config.gameMenu){
				scopeObjects[i].draw(); //
			}

			scopeObjects.bestScore.draw();

			self.menuController();

			pjs.OOP.drawArr(scopeObjects.particles);

		}else{
			scopeObjects.gameName.draw();
		}
	}

	this.exit = function(){
		
	}

	this.controlCallback = {
		'NewGame': function(t){
			game.setLoop('Process');
		},
		'LoadGame': function(t){
			// console.log(field.matrix);
			// storage.matrixLoad();
			// console.log("!!!!!!!!!!!!!!!!");
			// console.log(field.matrix);
			game.setLoop('Process');
			storage.matrixLoad();
		}
		// load Game
	}
	// additionally methods
	this.menuController = function(){
		for(var i in self.controlCallback){
			if(config.controlType == 'mouse'){
				if(mouse.isPeekObject('LEFT', scopeObjects[i])){
					self.controlCallback[i](scopeObjects[i]);
				}
			}else if(self.controlType == 'touch'){
				if(touch.isPeekObject(scopeObjects[i])){
					self.controlCallback[i](scopeObjects[i]);
				}
			}
		}
	}
}