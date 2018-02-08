var Config = function(){
	var self = this;
	this.fps = 60;
	this.gameName = "Quibble";
	this.gameMenu = {
		"NewGame": "Start",
		"LoadGame": "Load",
		"SettingsGame": "Settings",
		"ExitGame": "Exit"
	};

	this.fieldMatrixSize = {
		w: 10,
		h: 10
	};

	this.circleColors = ['red', 'blue', 'yellow', 'green', 'grey'];

	this.circleRadius = asu.s(5);
	this.fieldCellSize = s(asu.s(14), asu.s(14));
}