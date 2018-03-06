/**
 * [giveMeParamsFromObject is function for copy vars from params to object]
 *
 * @param  {[object]} obj ["this" or "self" an example]
 * @param  {[object]} params [object with params]
 *
 * @return {[undefined]} [empty]
 */
var giveMeParamsFromObject = function(obj, params){
	for(var i in params){
		obj[i] = params[i];
	}
}

/**
 * [SetObjectPosition class for positioning elements]
 *
 * @param {[object]} screen [screen size for example {w: 1920, h: 1080}]
 */
var SetObjectPosition = function(screen){
	this.screen = screen;
	var self = this;

	this.centerX = function(obj){
		self.pos(obj, 'x');
	}

	this.centerY = function(obj){
		self.pos(obj, 'y');
	}

	this.centerXY = function(obj){
		self.centerX(obj);
		self.centerY(obj);
	}

	this.posX = function(obj, percent){
		self.pos(obj, 'x', percent);
	}

	this.posY = function(obj, percent){
		self.pos(obj, 'y', percent);
	}

	this.pos = function(obj, axis, percentage){
		if(isNaN(obj.w) || typeof obj.w == 'undefined' || obj.w == '' || obj.w <= 0 || isNaN(obj.h) ||
			typeof obj.h == 'undecenterfined' || obj.h == '' || obj.h <= 0){
			obj.draw();
		}
		if(typeof percentage == 'undefined'){
			if(axis == 'x'){
				obj.x = self.screen.w / 2 - obj.w / 2;
			}else if(axis == 'y'){
				obj.y = self.screen.h / 2 - obj.h / 2;
			}else{
				console.log('SetObjectPosition', 'I don`t know what you want');
			}
		}else{
			if(axis == 'x'){
				obj.x = self.screen.w / 100 * percentage;
			}else if(axis == 'y'){
				obj.y = self.screen.h / 100 * percentage;
			}else{
				console.log('SetObjectPosition', 'I don`t know what you want');
			}
		}
	}
}

/**
 * [AbsoluteSizeUnit class for set absolute unit of text size]
 *
 * @param {[object]} screen [object example {w: 100, h: 20}]
 * @param {[number]} startedSize [started value of size. Defaul value = 1]
 */
var AbsoluteSizeUnit = function(screen, startedSize){
	var self = this;
	this.screen = screen;
	this.startedSize = typeof startedSize == 'undefined' ? 1 : startedSize;
	this.koef = 0;

	this.init = function(){
		self.koef = self.screen.w / 50;
		self.koef *= startedSize;
	}

	this.size = function(size){
		return self.koef * (size / 10);
	}

	this.s = function(size){
		return self.size(size);
	}

	self.init();
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var RGBARandom = function(min, max){
	var str = 'rgba(';
	str += Math.floor(getRandomArbitrary(min * 20,max * 20)) + ',';
	str += Math.floor(getRandomArbitrary(min * 20,max * 20)) + ',';
	str += Math.floor(getRandomArbitrary(min * 20,max * 20)) + ',';
	str += '1)';
	return str;
}

var canvasBlur = function(canvas, ctx, blur) {
    ctx.globalAlpha = 1 / (2 * blur);
    for (var y=-blur; y<=blur; y += 2) {
        for (var x=-blur; x<=blur; x += 2) {
            ctx.drawImage(canvas, x, y);
            if (x >= 0 && y >= 0) ctx.drawImage(canvas, -(x - 1), -(y - 1));
        }
    }
    ctx.globalAlpha = 1;
}

var fixCrossOriginImgLoad = function(file){
	var img = document.createElement('img');
	img.src = file,
	img.setAttribute('crossOrigin', '*');
	img.crossOrigin = "*";
	img.style = "display: none";
	document.getElementsByTagName('body')[0].appendChild(img);
	return file;
}