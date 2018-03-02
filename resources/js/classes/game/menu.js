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

		data.bestScore = storage.bestScoreLoad(); // it needs to be restored here because we will show this on menu screen

		//data.musicState = storage.musicStateLoad();
		var settingsStateLoad = storage.settingsStateLoad();
		data.soundState = settingsStateLoad.soundState;
		data.musicState = settingsStateLoad.musicState;
		


		if(data.musicState){ // audio init
			scopeObjects.backgroundMusic.play();
		}else if(!data.musicState){
			scopeObjects.backgroundMusic.stop();
		}else if(data.soundcState){
			// data.audio.play();
			// data.audio.loop = true;
		}else if(!data.soundState){
			// data.audio.pause();
		}
	
		// data.audio.pause(); // loop


		positioning.posX(scopeObjects.fpsText, 1);
		positioning.posY(scopeObjects.fpsText, 1);
	}

	this.update = function(){
		scopeObjects.monitorParticles();
		// rendering game name
		// 
		setTimeout(function(){ // show game logo 2.5 s
			self.flag = true;
		}, 2500);
		
		if(self.flag){
			pjs.OOP.drawArr(scopeObjects.particles);
			
			for(var i in config.gameMenu){
				scopeObjects[i].draw(); //
			}

			scopeObjects.bestScore.text = 'Best: ' + data.bestScore;
			scopeObjects.bestScore.draw();

			config.debug ? scopeObjects.fpsText.draw(scopeObjects.fpsText.text = pjs.system.getFPS()) : false;

			self.menuController();

		}else{
			scopeObjects.gameName.draw();
		}

	}

	this.exit = function(){
		
	}

	this.controlCallback = {
		'NewGame': function(t){
			if(data.gameoverState == true){
				data.gameoverState = false;
				field.resetMatrix();
			}
			game.setLoop('Process');
		},
		'LoadGame': function(t){
			game.setLoop('Process');
			field.matrixLoad(storage.matrixLoad());
			// data.bestScore = storage.bestScoreLoad(); // we loaded it in this.entry()
		},
		'SettingsGame': function(t){
			game.setLoop('Settings');
			// console.log("123");
		},
		'ExitGame': function(t){
			window.close();
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
			}else if(config.controlType == 'touch'){
				if(touch.isPeekObject(scopeObjects[i])){
					self.controlCallback[i](scopeObjects[i]);
				}
			}
		}
	}
}