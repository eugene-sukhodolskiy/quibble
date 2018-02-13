var Data = function(){
	var self = this;
	this.currentScore = 0;
	this.bestScore = 0;
	this.gameoverState = false;

	this.scorePlus = function(plus){
		self.currentScore += plus;
		if(self.bestScore < self.currentScore){
			self.bestScore = self.currentScore;
		}
	}
}