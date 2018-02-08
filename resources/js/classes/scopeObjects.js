// GameObjects was renamed to scopeObjects

var ScopeObjects = function(params){
	var self = this;
	this.pjs;
	this.screen;
	this.config;
	giveMeParamsFromObject(this, params);

	this.gameName = self.pjs.game.newTextObject({
		text: config.gameName,
		font: "Verdana",
		color: "#C62828",
		size: asu.s(70)
	});

	this.generateMenuItems = function(){
		for(var i in self.config.gameMenu){
			self[i] = self.pjs.game.newTextObject({
				text: self.config.gameMenu[i],
				font: "Verdana",
				color: "#C62828",
				size: asu.s(30)
			});
		}
	}

	this.generatePiecesBehindMenu = function(){ // problem
		for(var i = 0; i < self.config.pieces.amount; i++){
			//self[i] = self.pjs.game.newRectObject({
			self.pjs.game.newRectObject({
				x: 100,
				y: 100,
				w: asu.s(self.config.pieces.size),
				h: asu.s(self.config.pieces.size),
				fillColor: self.config.pieces.color
			});
		}
	}

	self.generateMenuItems();
	self.generatePiecesBehindMenu();
}