// in this file must be exist only base initialization game

var pjs = new PointJS(640, 480, {backgroundColor : "#EEEEEE"});
pjs.system.initFullPage();
var game = pjs.game;
var p = pjs.vector.point;
var s = pjs.vector.size;
var screen = game.getWH();


// creating objects
var positioning = new SetObjectPosition(screen);
var config = new Config();
var settings = new Settings();
var data = new Data();
var storage = new Storage();
var scopeObjects = new ScopeObjects({
	pjs: pjs,
	screen: screen,
	config: config
});
var field = new Field({
	pjs: pjs,
	screen: screen,
	config: config
});

// initialization game classes
game.newLoopFromClassObject("Menu", new Menu());
game.newLoopFromClassObject("Process", new Process());
game.newLoopFromClassObject("GameOver", new GameOver());
// set starting game class
game.setLoop("Menu");
// start rendering game
game.start(config.fps);