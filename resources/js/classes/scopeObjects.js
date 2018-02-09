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
	// this.rand = function(){
	// 	return {
	// 		randW: self.pjs.math.random(0, self.screen.w),
	// 		randH: self.pjs.math.random(0, self.screen.h)
	// 	}
	// }

	this.particles = []; // частици

	this.generateAnimateParticles = function(){
		for(var i=0;i<self.config.pieces.amount;i++){
			self.particles.push(self.getParticle());
		}
	}

	this.monitorParticles = function(){
		if(self.particles.length == 0){
			self.generateAnimateParticles();
		}
		for(var i in self.particles){
			var pos = self.particles[i].getPosition();
			// self.particles[i].moveTo({x: self.screen.w, y: self.screen.y, z: 0}, 10);
			var mouse = pjs.mouseControl.initMouseControl(); // mouse turn on
			if(i < 3){ // rewrite it
				self.particles[i].moveTo({x: self.pjs.mouseControl.getPositionS().x, y: self.pjs.mouseControl.getPositionS().y, z: 0}, self.pjs.math.random(0, 2));
			}else if(i > 3 ){
				self.particles[i].moveTo({x: self.pjs.math.random(-1 * self.screen.w - 200, self.screen.w + 200) + self.pjs.mouseControl.getPositionS().x / 5,
				 y: self.pjs.math.random(i * 12, self.screen.h) - self.pjs.mouseControl.getPositionS().y / 2, z: 0}, self.pjs.math.random(0, 5));
			}else{
				self.particles[i].moveTo({x: self.pjs.math.random(-10, self.screen.x), y: self.pjs.math.random(0, self.screen.h), z: 0}, self.pjs.math.random(0, 2));
			}

			if(pos.x > self.screen.w || pos.x < 0 || pos.y > self.screen.h || pos.y < 0 ){
				self.particles.splice(i, 1, self.getParticle());
			}
		}
	}

	this.getParticle = function(){
		var piece = {
			x: self.pjs.math.random(0, self.screen.w),
			y: self.pjs.math.random(0, self.screen.h),
			w: asu.s(self.config.pieces.size),
			h: asu.s(self.config.pieces.size),
			fillColor: self.config.pieces.color
		};

		return self.pjs.game.newRectObject(piece);
	}

	self.generateMenuItems();

}