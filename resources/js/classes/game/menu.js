// the name was simplified

var Menu = function(){
	var self = this;
	this.flag = false;
	this.entry = function(){
		positioning.centerXY(scopeObjects.gameName);
		
		var counter = 0;
		for(var i in config.gameMenu){
			counter++;
			positioning.centerX(scopeObjects[i]);
			positioning.pos(scopeObjects[i], 'y', counter * 15);
		}
	}

	this.update = function(){
		scopeObjects.monitorParticles();
		// rendering game name
		// 
		setTimeout(function(){ // show game logo 1 s
			self.flag = true;
		}, 2500);
		
		if(self.flag){
			for(var i in config.gameMenu){
				scopeObjects[i].draw(); //
			}
			self.menuController();

			// this.test = scopeObjects.generatePiecesBehindMenu;
			// this.test.draw();
			// var timerId = setInterval(function tick() {
				// for(var i = 0; i < 10; i++){
				// 	scopeObjects.piece.x = scopeObjects.rand().randW;
				// 	scopeObjects.piece.y = scopeObjects.rand().randH;
				// }
			// }, 1000);
			pjs.OOP.drawArr(scopeObjects.particles);
			
			//
		// var obj = game.newRectObject({ 
		//      x : 100, 
		//      y : 100, 
		//      w : 50, 
		//      h : 50, 
		//      fillColor : "#FBFE6F", 
		// });
		// var piece = pjs.game.newRectObject(obj);
		// piece.draw();
		}else{
			scopeObjects.gameName.draw();
		}
	}

	this.exit = function(){
		
	}

	this.controlCallback = {
		'NewGame': function(t){
			game.setLoop('Process');
		}
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