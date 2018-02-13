var GameOver = function(){
	this.entry = function(){
		positioning.centerXY(scopeObjects.gameOver);
		data.gameoverState = true;
	}

	this.update = function(){
		scopeObjects.gameOver.draw();
		if(config.controlType == 'mouse' && mouse.isPress('LEFT') || config.controlType == 'touch' && mouse.isPress()){
			game.setLoop('Menu');
		}
	}

	this.exit = function(){
		data.currentScore = 0;
	}
}