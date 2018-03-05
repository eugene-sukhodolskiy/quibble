// the name was simplified

var Menu = function(){
	var self = this;
	this.flag = false;
	this.entry = function(){
		positioning.centerXY(scopeObjects.gameName);

		positioning.centerX(scopeObjects.bestScore);
		positioning.pos(scopeObjects.bestScore, 'y', 17);

		var counter = 1.5;
		for(var i in config.gameMenu){
			counter++;
			positioning.centerX(scopeObjects[i]);
			positioning.pos(scopeObjects[i], 'y', counter * 13);
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

		positioning.centerX(scopeObjects.cup);
		positioning.posY(scopeObjects.cup, 5);
		positioning.posY(scopeObjects.cupBackground, 4);
	}

	this.update = function(){
		scopeObjects.monitorParticles();
		// rendering game name

		setTimeout(function(){ // show game logo 2.5 s
			self.flag = true;
		}, 2500);
		
		if(self.flag){
			pjs.OOP.drawArr(scopeObjects.particles);
			canvasBlur(canvas, ctx, config.menuBlurRadius);
			scopeObjects.cup.draw();
			// scopeObjects.cupBackground.draw();

			for(var i in config.gameMenu){
				scopeObjects[i].draw(); //
			}

			scopeObjects.bestScore.text = data.bestScore;
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
			if(config.controlType == 'mouse'){
				window.close(); // PC
			}else{
				navigator.app.exitApp(); // android
			}
		},
		'About': function(t){
			// switch to about screen
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