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

	this.gameSettings = {
		"SoundGame": "Sound",
		"MusicGame": "Music",
		"BackToGameMenu": "Back to menu"
	};

	this.fieldMatrixSize = {
		w: 3,
		h: 3
	};
	
	// this.fieldMatrixSize = {
	// 	w: 6,
	// 	h: 12
	// };

	this.circleColors = ['red', 'blue', 'yellow', 'green', 'grey', 'black', 'orange', 'pink'];

	this.circleRadius = asu.s(10);
	// this.circleRadius = asu.s(14);
	this.fieldCellSize = s(asu.s(28), asu.s(28));
	 // this.fieldCellSize = s(asu.s(42), asu.s(35));

	this.particles = {
		amount: 80, // 80
		size: asu.s(1.5),
		color: 'grey',
		minSpeed: 1, // particles movement speed
		maxSpeed: 5,

	};

	this.controlType = 'mouse'; // mouse or touch
	this.moveCellSpeed = .1;
	this.startCellGridPos = pjs.vector.point(asu.s(20), asu.s(100));
	this.lineWidth = asu.s(5);
	this.lineColor = '#03A9F4';
	this.minActiveCellCount = 2;
	this.debug = true;
}