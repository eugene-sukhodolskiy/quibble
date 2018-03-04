// the name was simplified

var Process = function(){
	var self = this;
	this.tmpT = pjs.game.getTime();
	this.timeLineStartIfScore = 100;
	this.timeLineDrawFlag = false;

	this.entry = function(){
		self.timeLineDrawFlag = false;
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
		

		positioning.posX(scopeObjects.timeLine, 0);
		positioning.posY(scopeObjects.timeLine, 0);
		scopeObjects.timeLine.w = screen.w - scopeObjects.timeLine.x * 2; // it makes some gaps in right side (the same as left one)
		scopeObjects.timeLine.maxW = screen.w - scopeObjects.timeLine.x * 2; 

		field.gameOverFlag = false;

	}

	this.update = function(){

		scopeObjects.gameFieldBackground.draw();
		self.cornerCircle.draw();
		scopeObjects.menuIco.draw(); //
		


		if(config.controlType == 'mouse'){
			var box = mouse.getPosition();
		}else if(config.controlType == 'touch'){
			var box = touch.getPosition();
		}

		box.w = 1;
		box.h = 1;

		if( ((config.controlType == 'mouse' && mouse.isPress("LEFT")) || (config.controlType == 'touch' && touch.isPress())) && scopeObjects.menuIco.isStaticIntersect(box)){
			game.setLoop('Menu');
		}

		if(field.gameOverFlag){
			game.setLoop('GameOver');
		}
		field.draw();
		// field.drawBorder();
		field.monitor();
		scopeObjects.gameScore.text = 'Score: ' + data.currentScore;
		scopeObjects.gameScore.draw();
		var time = pjs.game.getTime();
		
		if(!self.timeLineDrawFlag && self.timeLineStartIfScore < data.currentScore){
			self.timeLineDrawFlag = true;
		}

		if(self.timeLineDrawFlag){
			scopeObjects.timeLineDraw();
		}
		
		if(pjs.game.getTime() - self.tmpT > 1000){
			self.tmpT = pjs.game.getTime();
			// save
			storage.matrixSave();
			storage.bestScoreSave();
		}

		config.debug ? scopeObjects.fpsText.draw(scopeObjects.fpsText.text = pjs.system.getFPS()) : false;

	}

	this.exit = function(){
		
	}

}
