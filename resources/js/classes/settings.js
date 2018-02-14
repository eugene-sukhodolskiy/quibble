var Settings = function(){
	var self = this;
	this.tmpT = pjs.game.getTime();

	this.entry = function(){
		var counter = 0;
		for(var i in config.gameSettings){
			counter++;
			positioning.centerX(scopeObjects[i]);
			positioning.pos(scopeObjects[i], 'y', counter * 15);
		}

		positioning.posX(scopeObjects.fpsText, 1);
		positioning.posY(scopeObjects.fpsText, 1);
	}

	this.update = function(){

		scopeObjects.monitorParticles();

		for(var i in config.gameSettings){
			//console.log(i);
			 if(!data.musicState && i == "MusicGame"){ // something like this for SoundGame
			 	scopeObjects[i].color = "black";
			}else{
				scopeObjects[i].color = "#C62828"; // change it to more appropriate approach
			}

			scopeObjects[i].draw(); 
		}

		config.debug ? scopeObjects.fpsText.draw(scopeObjects.fpsText.text = pjs.system.getFPS()) : false;

		self.menuController();

		pjs.OOP.drawArr(scopeObjects.particles);

		if(pjs.game.getTime() - self.tmpT > 100){
			self.tmpT = pjs.game.getTime();
			// save
			storage.musicStateSave();
		}
	}

	this.exit = function(){
		
	}


	this.controlCallback = {
		'SoundGame': function(t){ // add code
			// if(data.gameoverState == true){
			// 	data.gameoverState = false;
			// 	field.resetMatrix();
			// }
			//game.setLoop('Process');
		},
		'MusicGame': function(t){
			data.musicState = !data.musicState;

			// music ON / OFF
			if(!data.musicState){
				data.audio.pause();
			}else{
				data.audio.play();
			}
		},
		'BackToGameMenu': function(t){
			game.setLoop('Menu');
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