// the name was simplified

var Process = function(){
	var self = this;
	this.tmpT = pjs.game.getTime();
	this.entry = function(){

	}

	this.update = function(){
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
