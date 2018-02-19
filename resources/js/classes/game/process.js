// the name was simplified

var Process = function(){
	var self = this;
	this.tmpT = pjs.game.getTime();
	this.entry = function(){
		positioning.posX(scopeObjects.menuIco, 6.5);
		positioning.posY(scopeObjects.menuIco, 5);
		// scopeObjects.menuIco.setShadow({ 
		//      shadowColor : "#235e7b", 
		//      shadowBlur : 20
		//      // shadowX : 5, 
		//      // shadowY : 5 
	 //   });
	 
		self.cornerCircle = pjs.game.newCircleObject({		   
			fillColor: '#004D40',
			radius: config.circleRadius
		});

		positioning.posX(self.cornerCircle, 6.5);
		positioning.posY(self.cornerCircle, 5);
		

		positioning.posX(scopeObjects.timeLine, 6.5);
		positioning.posY(scopeObjects.timeLine, 15);
		scopeObjects.timeLine.w = screen.w - scopeObjects.timeLine.x * 2; // it makes some gaps in right side (the same as left one)
		scopeObjects.timeLine.maxW = screen.w - scopeObjects.timeLine.x * 2; 



	}

	this.update = function(){

		scopeObjects.gameFieldBackground.draw();
		self.cornerCircle.draw();
		scopeObjects.menuIco.draw(); //
		scopeObjects.timeLine.draw();


		if(config.controlType == 'mouse'){
			var box = mouse.getPosition();
		}else if(config.controlType == 'touch'){
			var box = touch.getPosition();
		}

		box.w = 1;
		box.h = 1;

		if(scopeObjects.menuIco.isStaticIntersect(box) && pjs.mouseControl.isPress("LEFT")){
			game.setLoop('Menu');
		}

		if(field.checkOnGameOver()){
			game.setLoop('GameOver');
		}
		field.draw();
		// field.drawBorder();
		field.monitor();
		scopeObjects.gameScore.text = 'Score: ' + data.currentScore;
		scopeObjects.gameScore.draw();
		var time = pjs.game.getTime();
		
		if(pjs.game.getTime() - self.tmpT > 1000){
			self.tmpT = pjs.game.getTime();
			// save
			storage.matrixSave();
			storage.bestScoreSave();
			// timeLine decrease
			// 
			// next line should moved somewhere because it executes 60 times per second
			this.timeLineStep = scopeObjects.timeLine.maxW / 5; // 1000 / 2 = 1000 ms

			scopeObjects.timeLine.w = scopeObjects.timeLine.getSize().w - this.timeLineStep; //timeLineStep;

			if(scopeObjects.timeLine.getSize().w <= 0){
				scopeObjects.timeLine.w = scopeObjects.timeLine.maxW;
				data.scoreMinus(1); // minus 1 every cycle
			}
		}

		config.debug ? scopeObjects.fpsText.draw(scopeObjects.fpsText.text = pjs.system.getFPS()) : false;

	}

	this.exit = function(){
		
	}

}
