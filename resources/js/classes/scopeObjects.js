// GameObjects was be renamed to scopeObjects

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
		size: self.screen.w / 20
	});

	this.gameMenu = self.pjs.game.newTextObject({
		// text: {
		// 	for(var i in config.gameMenu){
		// 		text: i;
		// 	}
		// },
		text: "djdjjd \n\ kdkdkd";
		font: "Verdana",
		color: "#C62828",
		size: self.screen.w / 30
	});
}