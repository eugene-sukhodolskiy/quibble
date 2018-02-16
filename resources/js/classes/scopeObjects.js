// GameObjects was renamed to scopeObjects

var ScopeObjects = function(params){
	var self = this;
	this.pjs;
	this.screen;
	this.config;
	giveMeParamsFromObject(this, params);

	this.gameName = self.pjs.game.newTextObject({
		text: config.gameName,
		font: "Indie Flower",
		color: "white",
		size: asu.s(70)
	});

	this.fpsText = self.pjs.game.newTextObject({
		font: 'Indie Flower',
		color: 'red',
		size: asu.s(40)
	})

	this.gameOver = self.pjs.game.newTextObject({
		text: "Game Over",
		font: "Indie Flower",
		color: "white",
		size: asu.s(30)
	});

	this.bestScore = self.pjs.game.newTextObject({
		//text: "Best score: " + "result", // we write it in menu.js
		font: "Indie Flower",
		color: "white",
		size: asu.s(20)
	});

	this.generateMenuItems = function(){
		for(var i in self.config.gameMenu){
			self[i] = self.pjs.game.newTextObject({
				text: self.config.gameMenu[i],
				font: "Indie Flower",
				color: "white",
				size: asu.s(42)
			});

			self[i].setShadow(   { 
			     shadowColor : "#37474F", 
			     shadowBlur : asu.s(5), 
			     shadowX : 0, 
			     shadowY : 0
			   });
		}
	}

	this.generateSettingsItems = function(){
		for(var i in self.config.gameSettings){
			self[i] = self.pjs.game.newTextObject({
				text: self.config.gameSettings[i],
				font: "Indie Flower",
				color: "white",
				size: asu.s(42)
			});
			self[i].setShadow(   { 
			     shadowColor : "#37474F", 
			     shadowBlur : asu.s(5), 
			     shadowX : 0, 
			     shadowY : 0
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
				self.moveParticlesArr[i].moveY = self.screen.h + 1;
			break;
		}
		self.moveParticlesArr[i].speed = getRandomArbitrary(self.config.particles.minSpeed, self.config.particles.maxSpeed);
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
			
			self.particles[i].moveTo(self.pjs.vector.point(self.moveParticlesArr[i].moveX, self.moveParticlesArr[i].moveY), self.moveParticlesArr[i].speed * self.pjs.game.getDT(20));

			if(pos.x > self.screen.w || pos.x < 0 || pos.y > self.screen.h || pos.y < 0 ){ // del if particle leave game field
				self.particles.splice(i, 1, self.getParticle());
				self.particlesMoveTo(i); //
			}
		}
	}

	this.getParticle = function(){
		var rad = getRandomArbitrary(self.config.particles.size, self.config.particles.size * 10);
		var particle = {
			x: self.pjs.math.random(0, self.screen.w),
			y: self.pjs.math.random(0, self.screen.h),
			// w: self.config.particles.size,
			// h: self.config.particles.size,
			radius: rad,
			fillColor: self.config.circleColors[self.pjs.math.random(0, self.config.circleColors.length - 1)]//self.config.particles.color
		};

		return self.pjs.game.newCircleObject(particle);
	}

	self.generateMenuItems();
	self.generateSettingsItems();

	self.getSelectedCirc = function(p1){
		var circ = self.pjs.game.newCircleObject({
			fillColor: self.config.lineColor,
			radius: self.config.lineWidth * 1.3,
		});

		circ.setPositionC(p1);
		return circ;
	}

	this.gameScore = self.pjs.game.newTextObject({
		size: asu.s(21),
		text: 'Score: ' + data.currentScore,
		color: '#C62828',
		font: 'Indie Flower'
	});

	positioning.posX(self.gameScore, 55);
	positioning.posY(self.gameScore, 5);

	this.gameFieldBackground = self.pjs.game.newRectObject({
		fillColor: '#FAFAFA',
		x: 0, y: 0,
		w: self.screen.w,
		h: self.screen.h
	});

}