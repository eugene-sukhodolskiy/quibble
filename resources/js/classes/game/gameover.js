var GameOver = function(){
	this.entry = function(){
		positioning.centerXY(scopeObjects.gameOver);
		data.gameoverState = true;
		// var screenGameField = game.newImageObject({
		// 	x: 0,
		// 	y: 0,
		// 	w: screen.w,
		// 	file: data.screenSave
		// });
	}

	this.update = function(){
		// screenGameField.draw();
		canvasBlur(canvas, ctx, 6);
		scopeObjects.gameOver.draw();
		if(config.controlType == 'mouse' && mouse.isPress('LEFT') || config.controlType == 'touch' && touch.isPress()){
			game.setLoop('Menu');
		}

		config.debug ? scopeObjects.fpsText.draw(scopeObjects.fpsText.text = pjs.system.getFPS()) : false;
	}

	this.exit = function(){
		data.currentScore = 0;
	}
}