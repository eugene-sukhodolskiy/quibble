// GameField was renamed to field

var Field = function(params){
	var self = this;
	giveMeParamsFromObject(this, params);
	// vars
	this.matrix = [];
	this.shadowMatrix = [];
	this.activeCell = [];
	this.gridCell = false;
	this.touchFlag = false;
	this.lineArr = [];
	this.context = self.pjs.system.getContext();
	this.idCurrentCellWithMouse = false;


	// methods
	
	/**h
	 * [getCell generate and return circle object]
	 *
	 * @param  {[string]} color [circle color]
	 * @param  {[object]} position [pointjs point object]
	 *
	 * @return {[object]} [circle object]
	 */
	
	this.matrixSave = function(){
		this.tmpMatrix = [];
		for(var i in self.matrix){
			for(var n in self.matrix[i]){
				if(typeof this.tmpMatrix[i] == 'undefined'){
					this.tmpMatrix[i] = [];
				}
				this.tmpMatrix[i].push({
					"fillColor": self.matrix[i][n].fillColor, 
					"id": self.matrix[i][n].id, 
					"matrixIndex": self.matrix[i][n].matrixIndex
				})
			}
		}
		return this.tmpMatrix;
	}

	this.matrixLoad = function(matrixLoadObj){ 
		for(var i in self.matrix){
			for(var n in self.matrix[i]){
				self.matrix[i][n].fillColor =  matrixLoadObj[i][n].fillColor;
				self.matrix[i][n].id = matrixLoadObj[i][n].id;
				self.matrix[i][n].matrixIndex = matrixLoadObj[i][n].matrixIndex;
			}
		}
	}

	this.getCell = function(color, position){
		var cell = self.pjs.game.newCircleObject({
			fillColor: color,
			radius: self.config.circleRadius
		});

		cell.setPositionC(position);

		return cell;
	}

	// I think, that this method can`t be here
	this.getRandomColor = function(colorArr){
		return colorArr[self.pjs.math.random(0, colorArr.length - 1)];
	}

	this.initFirstStateMatrix = function(){
		var startPos = self.config.startCellGridPos;
		
		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){
				if(typeof self.matrix[i] == 'undefined'){
					self.matrix[i] = [];
				}
				var cell = self.getCell(self.getRandomColor(self.config.circleColors), self.pjs.vector.point(startPos.x + self.config.fieldCellSize.w * i, startPos.y + self.config.fieldCellSize.h * n));
				cell.matrixIndex = {"i": i, "n": n};
				self.matrix[i].push(cell);
			}
		}
	}

	this.resetMatrix = function(){
		self.matrix = [];
		self.initFirstStateMatrix();
	}

	this.draw = function(){
		for(var i in self.matrix){
			for(var n in self.matrix[i]){
				if(!self.matrix[i][n]) continue;
				self.matrix[i][n].draw();
			}
		}

		self.moveToPoint();
		self.drawTouchLines();
	}

	this.drawTouchLines = function(){
		if(!self.touchFlag) return false;

		self.context.beginPath();
        self.context.lineWidth = self.config.lineWidth; // толщина линии
        self.context.strokeStyle = self.config.lineColor; // цвет линии
        

		for(var i=0;i<self.activeCell.length - 1; i++){
			var p1 = self.activeCell[i].getPositionC();
			var p2 = self.activeCell[i+1].getPositionC();
			self.context.moveTo(p1.x, p1.y);
        	self.context.lineTo(p2.x, p2.y);
			self.context.stroke();

		}

		for(var i=0;i<self.activeCell.length; i++){
			scopeObjects.getSelectedCirc(self.activeCell[i].getPositionC()).draw();
		}

	}
	
	this.drawBorder = function(){
		if(!self.gridCell){
			var first = self.matrix[0][0].getPosition();
			// var last = self.matrix[self.matrix.length-1][self.matrix[self.matrix.length-1].length-1].getPosition();
			// var size = self.pjs.vector.size(last.x - first.x  + self.config.fieldCellSize.h, last.y - first.y + self.config.fieldCellSize.h);
			var size = self.pjs.vector.size(self.config.fieldCellSize.w * self.config.fieldMatrixSize.w, self.config.fieldCellSize.h * self.config.fieldMatrixSize.h);
			self.gridCell = self.pjs.game.newRectObject({
				size: size,
				strokeColor: 'grey',
				strokeWidth: asu.s(.5),
				x: first.x - asu.s(2), // 2 because in config.js circleRadius = asu.s(5) and fieldCellSize = s(asu.s(14), asu.s(14))
				y: first.y - asu.s(2)
			});
		}

		self.gridCell.draw();
	}

	this.checkCellOnActive = function(obj){
		for(var i in self.activeCell){
			if(self.activeCell[i].id == obj.id){
				return true;
			}
		}

		return false;
	}

	this.monitorOverOnCellAfterTouch = function(){

		if(!(self.config.controlType == 'mouse' && self.mouse.isDown("LEFT")) && !(self.config.controlType == 'touch' && self.touch.isDown())) return false;

		if(self.touchFlag === false && self.activeCell.length != 0){
			self.activeCell = [];
		}

		self.touchFlag = true;

		if(self.config.controlType == 'mouse'){
			var box = self.mouse.getPosition();
		}else if(self.config.controlType == 'touch'){
			var box = self.touch.getPosition();
		}

		box.w = 1;
		box.h = 1;

		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){

				if(!self.matrix[i][n].isVisible()) {
					continue;
				}

				if(self.matrix[i][n].isStaticIntersect(box)){
					self.idCurrentCellWithMouse = self.matrix[i][n].id;
					self.moveBack();
					if(!self.checkCellOnActive(self.matrix[i][n])){
						var len = self.activeCell.length;
						if(len != 0 && (Math.abs(self.activeCell[len-1].matrixIndex.i - i) > 1 || Math.abs(self.activeCell[len-1].matrixIndex.n - n) > 1)){
							return false;
						}
						self.activeCell.push(self.matrix[i][n]);
					}
					return true;
				}
			}
		}
	}

	this.monitorOutOnCellAfterTouch = function(){
		if(self.touchFlag === false) return false;

		if(self.config.controlType == 'mouse' && self.mouse.isUp("LEFT") || self.config.controlType == 'touch' && self.touch.isUp()){
			self.touchFlag = false;
			// console.log(self.activeCell);
			if(self.checkActiveCellsOnCorrect()){
				self.removeActivatedCells();
			}else{
				self.activeCell = [];
			}
		}
	}

	this.removeActivatedCells = function(){
		for(var i in self.activeCell){
			self.matrix[self.activeCell[i].matrixIndex.i][self.activeCell[i].matrixIndex.n].setVisible(false);
		}

		// self.existCellDown();
		self.scoreCounter();
		self.cellDown();
		self.removeUnvisibleCells();
		self.setMoveToPoint();
	}

	this.cellDown = function(){
		for(var m = 0; m < self.config.fieldMatrixSize.h; m++){
			for(var i=0; i<self.config.fieldMatrixSize.w; i++){
				for(var n=1; n<self.config.fieldMatrixSize.h; n++){
					if(!self.matrix[i][n].isVisible()){
						// console.log(self.matrix[i][n]);
						var tmp = self.matrix[i][n];
						var pos = self.matrix[i][n].getPosition();
						var prevpos = self.matrix[i][n - 1].getPosition();
						var matInx1 = self.matrix[i][n].matrixIndex;
						var matInx2 = self.matrix[i][n - 1].matrixIndex;
						self.matrix[i][n] = self.matrix[i][n - 1];
						//self.matrix[i][n].setPosition(pos);
						// self.matrix[i][n].moveToPoint = pos;
						self.matrix[i][n].matrixIndex = matInx1; 
						self.matrix[i][n - 1] = tmp;
						self.matrix[i][n - 1].matrixIndex = matInx2;
						self.matrix[i][n - 1].setPosition(prevpos);
					}
				}
			}
		}
	}

	this.removeUnvisibleCells = function(){
		var startPos = self.config.startCellGridPos;
		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){
				if(!self.matrix[i][n].isVisible()){
					var cell = self.getCell(self.getRandomColor(self.config.circleColors), self.pjs.vector.point(100, 100));
					// positioning.posX(cell, 50);
					cell.setPositionC(self.pjs.vector.point(startPos.x + self.config.fieldCellSize.w * i, 100));
					cell.matrixIndex = {"i": i, "n": n};
					//cell.moveToPoint = self.matrix[i][n].getPosition();
					self.matrix[i][n] = cell;
				}
			}
		}
	}

	this.checkActiveCellsOnCorrect = function(){
		if(self.activeCell.length < self.config.minActiveCellCount){
			return false;
		}

		var prevColor = '';
		for(var i in self.activeCell){
			if(i == 0){
				prevColor = self.activeCell[i].fillColor;
				continue;
			}

			if(self.activeCell[i].fillColor != prevColor){
				return false;
			}

			if(i && (Math.abs(self.activeCell[i].matrixIndex.i - self.activeCell[i-1].matrixIndex.i) > 1 || Math.abs(self.activeCell[i].matrixIndex.n - self.activeCell[i-1].matrixIndex.n) > 1)){
				return false;
			}

			prevColor = self.activeCell[i].fillColor;
		}

		return true;
	}

	this.scoreCounter = function(){
		data.scorePlus(self.activeCell.length);
	}

	this.moveBack = function(){
		if(self.activeCell.length > 1 && self.activeCell[self.activeCell.length - 2].id == self.idCurrentCellWithMouse){
			self.activeCell.splice(self.activeCell.length - 1, 1);
		}
	}

	this.moveToPoint = function(){
		for(var i in self.matrix){
			for(var n in self.matrix[i]){
				if(typeof self.matrix[i][n].moveToPoint != 'undefined' && self.matrix[i][n].moveToPoint != false && self.matrix[i][n].moveToPoint.y != self.matrix[i][n].y){
					self.matrix[i][n].moveToC(self.matrix[i][n].moveToPoint, self.config.moveCellSpeed * self.pjs.game.getDT(.5));
					var center = self.matrix[i][n].getPositionC();
					if(Math.abs(center.y - self.matrix[i][n].moveToPoint.y) < 2){
						self.matrix[i][n].moveToPoint = false;
					}
				}
			}
		}
	}

	this.setMoveToPoint = function(){
		var startPos = self.config.startCellGridPos;

		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){
				self.matrix[i][n].moveToPoint = self.pjs.vector.point(startPos.x + self.config.fieldCellSize.w * i, startPos.y + self.config.fieldCellSize.h * n);
			}
		}
	}

	this.checkOnGameOver = function(){
		var ns = self.config.fieldMatrixSize.h - 1;
		var is = self.config.fieldMatrixSize.w - 1;
		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){
				if(n > 0 && self.matrix[i][n].fillColor == self.matrix[i][n - 1].fillColor){
					return false;
				}

				if(n < ns && self.matrix[i][n].fillColor == self.matrix[i][n + 1].fillColor){
					return false;
				}

				if(i < is && self.matrix[i][n].fillColor == self.matrix[i + 1][n].fillColor){
					return false;
				}

				if(i > 0 && self.matrix[i][n].fillColor == self.matrix[i - 1][n].fillColor){
					return false;
				}

				if(i > 0 && n > 0 && self.matrix[i][n].fillColor == self.matrix[i - 1][n - 1].fillColor){
					return false;
				}

				if(i > 0 && n < ns && self.matrix[i][n].fillColor == self.matrix[i - 1][n + 1].fillColor){
					return false;
				}

				if(i < is && n > 0 && self.matrix[i][n].fillColor == self.matrix[i + 1][n - 1].fillColor){
					return false;
				}

				if(i < is && n < ns && self.matrix[i][n].fillColor == self.matrix[i + 1][n + 1].fillColor){
					return false;
				}
			}
		}

		return true;
	}

	this.existCellDown = function(){ 
		var downPos = {};
		for(var i in self.activeCell){
			if(typeof downPos[self.activeCell[i].matrixIndex.i] == 'undefined'){
				downPos[self.activeCell[i].matrixIndex.i] = self.activeCell[i].matrixIndex.n;
			}else if(self.activeCell[i].matrixIndex.n > downPos[self.activeCell[i].matrixIndex.i]){
				downPos[self.activeCell[i].matrixIndex.i] = self.activeCell[i].matrixIndex.n;
			}
		}

		// console.log(downPos);
	}

	this.monitor = function(){
		// self.monitorTouchOnCell();
		self.monitorOverOnCellAfterTouch();
		self.monitorOutOnCellAfterTouch();
	}

	self.initFirstStateMatrix();
}