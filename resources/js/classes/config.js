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
		"SoundGame": "Sound: On",
		"MusicGame": "Music: On",
		"BackToGameMenu": "Back to menu"
	};

	this.fieldMatrixSize = {
		w: 6,
		h: 11
	};
	
	// this.fieldMatrixSize = {
	// 	w: 6,
	// 	h: 12
	// };

	this.circleColors = ['#F44336', '#E91E63', '#42A5F5', '#880E4F', '#9C27B0', '#B388FF']; // '#9E9D24', '#FDD835', '#E65100', '#4E342E'

	this.circleRadius = asu.s(15);
	// this.circleRadius = asu.s(14);
	this.fieldCellSize = s(asu.s(45), asu.s(41));
	 // this.fieldCellSize = s(asu.s(42), asu.s(35));

	this.particles = {
		amount: 50, // 80
		minSize: asu.s(3),
		maxSize: asu.s(60),
		color: '#C62828',
		minSpeed: asu.s(.1), // particles movement speed
		maxSpeed: asu.s(2),

	};

	this.controlType = 'mouse'; // mouse or touch
	this.moveCellSpeed = .1;
	this.startCellGridPos = pjs.vector.point(asu.s(35), asu.s(100));
	this.lineWidth = asu.s(5);
	this.lineColor = '#03A9F4';
	this.minActiveCellCount = 2;
	this.debug = false; // true - show current fps 
}