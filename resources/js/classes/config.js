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

	this.circleRadius = asu.s(10);
	this.fieldCellSize = s(asu.s(28), asu.s(28));

	this.particles = {
		amount: 400,
		size: asu.s(0.3),
		color: 'green',
		minSpeed: 1, // particles movement speed
		maxSpeed: 5,

	};

	this.controlType = 'mouse'; // mouse or touch
}