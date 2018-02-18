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
		var particlesMaxDiametr = config.particles.maxSize * 2;
		switch(self.pjs.math.random(0, 3)){
			// u can use self.pjs.vector.point(x, y); instead {x: 1, y: 1, z: 0} // thx
			case 0:
				self.moveParticlesArr[i].moveX = -1 * particlesMaxDiametr -1; // -1 for small particles (or if u want to del particle when it reach screen corner)
				self.moveParticlesArr[i].moveY = self.pjs.math.random(0, self.screen.h);
			break;
			case 1:
				self.moveParticlesArr[i].moveX = self.pjs.math.random(0, self.screen.w);
				self.moveParticlesArr[i].moveY = -1 * particlesMaxDiametr -1; // -1 for small particles
			break;
			case 2:
				self.moveParticlesArr[i].moveX = self.screen.w + 1 + particlesMaxDiametr;
				self.moveParticlesArr[i].moveY = self.pjs.math.random(0, self.screen.h);
			break;
			case 3:
				self.moveParticlesArr[i].moveX = self.pjs.math.random(0, self.screen.w);
				self.moveParticlesArr[i].moveY = self.screen.h + 1 + particlesMaxDiametr;
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
		var particlesMaxDiametr = config.particles.maxSize * 2;
		if(self.particles.length == 0){
			self.generateAnimateParticles();
		}
		for(var i in self.particles){
			var pos = self.particles[i].getPosition();
			
			self.particles[i].moveTo(self.pjs.vector.point(self.moveParticlesArr[i].moveX, self.moveParticlesArr[i].moveY), self.moveParticlesArr[i].speed * self.pjs.game.getDT(20));

			if(pos.x > self.screen.w + particlesMaxDiametr || pos.x < 0 - particlesMaxDiametr ||
				pos.y > self.screen.h + particlesMaxDiametr || pos.y < 0 - particlesMaxDiametr){ // del if particle leave game field
				self.particles.splice(i, 1, self.getParticle());
				self.particlesMoveTo(i); //
			}
		}
	}

	this.getParticle = function(){
		var rad = getRandomArbitrary(self.config.particles.minSize, self.config.particles.maxSize);
		var randX = 0;
		var randY = 0;
		var particlesMaxDiametr = config.particles.maxSize * 2;
		switch(self.pjs.math.random(0, 3)){
			case 0:
				randX = -1 * particlesMaxDiametr + 1;
				randY = self.pjs.math.random(0, self.screen.h);
			break;
			case 1:
				randX = self.pjs.math.random(0, self.screen.w);
				randY = -1 * particlesMaxDiametr + 1;
			break;
			case 2:
				randX = self.screen.w - 2 + particlesMaxDiametr;
				randY = self.pjs.math.random(0, self.screen.h);
			break;
			case 3:
				randX = self.pjs.math.random(0, self.screen.w);
				randY = self.screen.h - 2 + particlesMaxDiametr;
			break;
		}
		// var tmpRand3 = self.pjs.math.random(0, 1);
		var particle = {
			// x: self.pjs.math.random(0, self.screen.w),
			// y: self.pjs.math.random(0, self.screen.h),
			x: randX,
			y: randY,
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

	this.deleteObjSound = self.pjs.audio.newAudio('resources/media/metal-short-hit-dampened.mp3', .6);
	
	positioning.posX(self.gameScore, 40);
	positioning.posY(self.gameScore, 5.5);

	this.gameFieldBackground = self.pjs.game.newRectObject({
		fillColor: '#FAFAFA',
		x: 0, y: 0,
		w: self.screen.w,
		h: self.screen.h
	});

	this.menuIco = game.newImageObject({ 
     file : "resources/media/menu-icon.png", 
     x : 0, 
     y : 0, 
     w : asu.s(30)
    // scale : 0.2
   });

}