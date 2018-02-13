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

		this.bestScore = self.pjs.game.newTextObject({
		text: "Best score: " + "result", // where should I get it?
		font: "Verdana",
		color: "#C62828",
		size: asu.s(10)
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

	this.particles = []; // частици
	this.moveParticlesArr = []; // moveTo() array
	for(let i = 0; i < self.config.particles.amount; i++){
		this.moveParticlesArr.push({moveX: 0, moveY: 0, speed: 0});
	}
	//
	this.particlesMoveTo = function(i){
		//console.log(i);
		switch(self.pjs.math.random(0, 3)){
			// u can use self.pjs.vector.point(x, y); instead {x: 1, y: 1, z: 0} // thx
			case 0:
				self.moveParticlesArr[i].moveX = -1;
				self.moveParticlesArr[i].moveY = self.pjs.math.random(0, self.screen.h);
			break;
			case 1:
				self.moveParticlesArr[i].moveX = self.pjs.math.random(0, self.screen.w);
				self.moveParticlesArr[i].moveY = -1;
			break;
			case 2:
				self.moveParticlesArr[i].moveX = self.screen.w + 1;
				self.moveParticlesArr[i].moveY = self.pjs.math.random(0, self.screen.h);
			break;
			case 3:
				self.moveParticlesArr[i].moveX = self.pjs.math.random(0, self.screen.w);
				self.moveParticlesArr[i].moveY = self.screen.h + 1;;
			break;
		}
		self.moveParticlesArr[i].speed = self.pjs.math.random(self.config.particles.minSpeed, self.config.particles.maxSpeed);
	}

	this.generateAnimateParticles = function(){
		for(var i=0;i<self.config.particles.amount;i++){
			self.particles.push(self.getParticle());
			self.particlesMoveTo(i); //
		}
	}

	this.monitorParticles = function(){
		if(self.particles.length == 0){
			self.generateAnimateParticles();
		}
		for(var i in self.particles){
			var pos = self.particles[i].getPosition();

			// your code need write to function with name particlesMove or another name
			// self.particles[i].moveTo({x: self.screen.w, y: self.screen.y, z: 0}, 10);
			// this line need write in game.js, because now, she init 60 times per second !!!!! I DO IT 
			// How can I do it? It doesn't want to work like you write... moveTo works only in loop... Or maybe I don't undestend something?

			self.particles[i].moveTo(self.pjs.vector.point(self.moveParticlesArr[i].moveX, self.moveParticlesArr[i].moveY), self.moveParticlesArr[i].speed * self.pjs.game.getDT(20));

			if(pos.x > self.screen.w || pos.x < 0 || pos.y > self.screen.h || pos.y < 0 ){ // del if particle leave game field
				self.particles.splice(i, 1, self.getParticle());
				self.particlesMoveTo(i); //
			}
		}
	}

	this.getParticle = function(){
		var particle = {
			x: self.pjs.math.random(0, self.screen.w),
			y: self.pjs.math.random(0, self.screen.h),
			w: asu.s(self.config.particles.size),
			h: asu.s(self.config.particles.size),
			fillColor: self.config.particles.color
		};

		return self.pjs.game.newRectObject(particle);
	}

	self.generateMenuItems();

	self.getLine = function(p1, p2){
		var dist = self.pjs.vector.getDistance(p1, p2);
		var line = self.pjs.game.newRectObject({
			fillColor: 'black',
			w: 5,
			h: dist
		});

		var center = {
			x: p1.x + Math.abs(p1.x - p2.x),
			y: p1.y + Math.abs(p1.y - p2.y)
		}

		line.setPositionC(center);

		var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		angle = angle * 180 / Math.PI;

		line.setAngle(-angle);

		return line;
	}

}