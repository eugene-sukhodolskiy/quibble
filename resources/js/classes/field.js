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


	// methods
	
	/**h
	 * [getCell generate and return circle object]
	 *
	 * @param  {[string]} color [circle color]
	 * @param  {[object]} position [pointjs point object]
	 *
	 * @return {[object]} [circle object]
	 */
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
		var startPos =  self.pjs.vector.point(asu.s(20), asu.s(200));
		
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

	this.draw = function(){
		for(var i in self.matrix){
			for(var n in self.matrix[i]){
				if(!self.matrix[i][n]) continue;
				self.matrix[i][n].draw();
				self.matrix[i][n].drawStaticBox();
			}
		}

		self.moveToPoint();
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

	// this.monitorTouchOnCell = function(){
	// 	if(self.touchFlag === true) return false;

	// 	if(!(self.config.controlType == 'mouse' && self.mouse.isDown('LEFT'))) return false;

	// 	if(self.config.controlType == 'mouse'){
	// 		var box = self.mouse.getPosition();
	// 	}else if(self.config.controlType == 'touch'){
	// 		var box = self.touch.getPosition();
	// 	}

	// 	box.w = 1;
	// 	box.h = 1;

	// 	for(var i=0; i<self.config.fieldMatrixSize.w; i++){
	// 		for(var n=0; n<self.config.fieldMatrixSize.h; n++){

	// 			if(self.matrix[i][n].isIntersect(box)){
	// 				self.touchFlag = true;
	// 				//self.activeCell.push(self.matrix[i][n]);
	// 				return true;
	// 			}
	// 		}
	// 	}
	// }

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
					if(!self.checkCellOnActive(self.matrix[i][n])){
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
			console.log(self.activeCell);
			self.removeActivatedCells();
		}
	}

	this.removeActivatedCells = function(){
		for(var i in self.activeCell){
			self.matrix[self.activeCell[i].matrixIndex.i][self.activeCell[i].matrixIndex.n].setVisible(false);
		}

		self.existCellDown();
		self.cellDown();
		self.removeUnvisibleCells();
	}

	this.cellDown = function(){
		for(var m = 0; m < self.config.fieldMatrixSize.h; m++){
			for(var i=0; i<self.config.fieldMatrixSize.w; i++){
				for(var n=1; n<self.config.fieldMatrixSize.h; n++){
					if(!self.matrix[i][n].isVisible()){
						console.log(self.matrix[i][n]);
						var tmp = self.matrix[i][n];
						var pos = self.matrix[i][n].getPosition();
						var prevpos = self.matrix[i][n - 1].getPosition();
						var matInx1 = self.matrix[i][n].matrixIndex;
						var matInx2 = self.matrix[i][n - 1].matrixIndex;
						self.matrix[i][n] = self.matrix[i][n - 1];
						// self.matrix[i][n].setPosition(pos);
						self.matrix[i][n].moveToPoint = pos;
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
		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){
				if(!self.matrix[i][n].isVisible()){
					//self.matrix[i][n] = false;
					var cell = self.getCell(self.getRandomColor(self.config.circleColors), self.pjs.vector.point(100, 100));
					cell.matrixIndex = {"i": i, "n": n};
					cell.moveToPoint = self.matrix[i][n].getPosition();
					self.matrix[i][n] = cell;
				}
			}
		}
	}

	this.generateNewCells = function(){
		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){
				if(self.matrix[i][n] !== false) continue;

				var cell = self.getCell(self.getRandomColor(self.config.circleColors), self.pjs.vector.point(100, 100));
				positioning.centerX(cell);
				cell.matrixIndex = {"i": i, "n": n};
				self.matrix[i][n] = cell;
			}
		}
	}

	this.moveToPoint = function(){
		for(var i in self.matrix){
			for(var n in self.matrix[i]){
				if(typeof self.matrix[i][n].moveToPoint != 'undefined' && self.matrix[i][n].moveToPoint != false && self.matrix[i][n].moveToPoint.y != self.matrix[i][n].y){
					self.matrix[i][n].moveTo(self.matrix[i][n].moveToPoint, self.config.moveCellSpeed * self.pjs.game.getDT(.5));

					if(Math.abs(self.matrix[i][n].y - self.matrix[i][n].moveToPoint.y) < 2){
						self.matrix[i][n].moveToPoint = false;
					}
				}
			}
		}
	}

	// this.cellDown = function(){
	// 	for(var i=0; i<self.config.fieldMatrixSize.w; i++){
	// 		var emptyCells = [];
	// 		var fl = false;
	// 		var inx = 0;
	// 		for(var n=self.config.fieldMatrixSize.h - 1; n>=0; n++){
	// 			if(!self.matrix[i][n].isVisible()){
	// 				emptyCells.push(self.matrix[i][n]);
	// 				self.fl = true;
	// 			}

	// 			if(self.fl && ){
	// 				self.self.matrix[i][n].moveToCellCoords = emptyCells[inx++];
	// 			}
	// 		}
	// 	}
	// }

	this.existCellDown = function(){ 
		var downPos = {};
		for(var i in self.activeCell){
			if(typeof downPos[self.activeCell[i].matrixIndex.i] == 'undefined'){
				downPos[self.activeCell[i].matrixIndex.i] = self.activeCell[i].matrixIndex.n;
			}else if(self.activeCell[i].matrixIndex.n > downPos[self.activeCell[i].matrixIndex.i]){
				downPos[self.activeCell[i].matrixIndex.i] = self.activeCell[i].matrixIndex.n;
			}
		}

		console.log(downPos);
	}

	this.monitor = function(){
		// self.monitorTouchOnCell();
		self.monitorOverOnCellAfterTouch();
		self.monitorOutOnCellAfterTouch();
	}

	this.drawTouchLine = function(){

	}

	self.initFirstStateMatrix();
}