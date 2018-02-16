var Data = function(){
	var self = this;
	this.currentScore = 0;
	this.bestScore = 0;
	this.gameoverState = false;
	this.soundState = true; // don't forget to add sound :)
	this.musicState = true;

	this.scorePlus = function(plus){
		self.currentScore += plus;
		if(self.bestScore < self.currentScore){
			self.bestScore = self.currentScore;
		}
	}

	this.audio = document.getElementById('audio'); // music
}