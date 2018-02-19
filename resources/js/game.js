// in this file must be exist only base initialization game

var pjs = new PointJS(640, 480, {backgroundColor : "#B0BEC5"});
pjs.system.initFullPage();
var game = pjs.game;
var p = pjs.vector.point;
var s = pjs.vector.size;
var screen = game.getWH();
var mouse = pjs.mouseControl.initMouseControl();
var touch = pjs.touchControl.initTouchControl();

// Oleh want to see this code.
// var music = new Audio('resources/media/Clouds.mp3');
// music.play();

// creating objects
var positioning = new SetObjectPosition(screen);
var asu = new AbsoluteSizeUnit(screen, 1.7);
var config = new Config();
//var settings = new Settings();
var data = new Data();
var storage = new Storage({
	// pjs: pjs,
	// config: config
});
var scopeObjects = new ScopeObjects({
	pjs: pjs,
	screen: screen,
	config: config,
	positioning: positioning //
});
var field = new Field({
	pjs: pjs,
	screen: screen,
	config: config,
	mouse: mouse,
	touch: touch
});

if(config.debug){
	pjs.system.initFPSCheck();
}

// initialization game classes
game.newLoopFromClassObject("Menu", new Menu());
game.newLoopFromClassObject("Process", new Process());
game.newLoopFromClassObject("GameOver", new GameOver());
game.newLoopFromClassObject("Settings", new Settings());

// set starting game class
//game.setLoop("Process");
game.setLoop("Menu"); // comment it if you need 
// start rendering game
game.start(config.fps);
