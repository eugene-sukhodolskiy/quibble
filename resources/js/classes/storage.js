var Storage = function(){
// save
// loadGameSession
// isAvailableForLoad
// loadLast	
	
	this.matrixSave = function(){
		console.log("matrix saving done!");
		this.serialObj = JSON.stringify(field.matrix); 
		localStorage.setItem("matrix", this.serialObj); 
	}

	this.matrixLoad = function(){
		console.log("matrix loading... done!");
		//field.matrix = []; // ?
		field.matrix = JSON.parse(localStorage.getItem("matrix"));
	}

	this.delKey = function(key){ // del value according to key
		delete localStorage[key];
	}
	
	this.delAll = function(key){
		localStorage.clear();
	}	
}

