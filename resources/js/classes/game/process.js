// the name was simplified

var Process = function(){
	var self = this;
	this.tmpT = pjs.game.getTime();
	this.entry = function(){
		positioning.posX(scopeObjects.menuIco, 90);
		positioning.posY(scopeObjects.menuIco, 5);
		scopeObjects.menuIco.setShadow({ 
		     shadowColor : "#235e7b", 
		     shadowBlur : 20
		     // shadowX : 5, 
		     // shadowY : 5 
	   });
	}

	this.update = function(){

		scopeObjects.gameFieldBackground.draw();
		scopeObjects.menuIco.draw(); //
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
		}

		config.debug ? scopeObjects.fpsText.draw(scopeObjects.fpsText.text = pjs.system.getFPS()) : false;

	}

	this.exit = function(){
		
	}

}
