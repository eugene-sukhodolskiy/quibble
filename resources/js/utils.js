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
 * @param {[object]} screen [screen size an example {w: 1920, h: 1080}]
 */
var SetObjectPosition = function(screen){
	this.screen = screen;
	var self = this;

	this.centerX = function(obj){
		self.center(obj, 'x');
	}

	this.centerY = function(obj){
		self.center(obj, 'y');
	}

	this.centerXY = function(obj){
		self.centerX(obj);
		self.centerY(obj);
	}

	this.center = function(obj, axis){
		if(isNaN(obj.w) || typeof obj.w == 'undefined' || obj.w == '' || obj.w <= 0 || isNaN(obj.h) || typeof obj.h == 'undefined' || obj.h == '' || obj.h <= 0){
			obj.draw();
		}
		if(axis == 'x'){
			obj.x = self.screen.w / 2 - obj.w / 2;
		}else if(axis == 'y'){
			obj.y = self.screen.h / 2 - obj.h / 2;
		}else{
			console.log('SetObjectPosition', 'I don`t know what you want');
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