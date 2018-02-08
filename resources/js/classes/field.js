// GameField was renamed to field

var Field = function(params){
	var self = this;
	giveMeParamsFromObject(this, params);
	// vars
	this.matrix = [];
	this.gridCell = false;


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
		var startPos =  self.pjs.vector.point(100, 100);
		
		for(var i=0; i<self.config.fieldMatrixSize.w; i++){
			for(var n=0; n<self.config.fieldMatrixSize.h; n++){
				if(typeof self.matrix[i] == 'undefined'){
					self.matrix[i] = [];
				}
				var cell = self.getCell(self.getRandomColor(self.config.circleColors), self.pjs.vector.point(startPos.x + self.config.fieldCellSize.w * i, startPos.y + self.config.fieldCellSize.h * n));
				self.matrix[i].push(cell);
			}
		}
	}

	this.draw = function(){
		for(var i in self.matrix){
			self.pjs.OOP.drawArr(self.matrix[i]);
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

	self.initFirstStateMatrix();
}