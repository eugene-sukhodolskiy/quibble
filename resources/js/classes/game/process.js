// the name was simplified

var Process = function(){
	var self = this;
	this.tmpT = pjs.game.getTime(); //
	this.entry = function(){
		//storage.matrixLoad();
	}

	this.update = function(){
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
		}

	}

	this.exit = function(){
		
	}

}
