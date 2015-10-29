var fruitObj = function(){
	this.alive = []; //boole
	this.x = [];
	this.y = [];
	this.l = [];
	this.spd = [];
	this.cfu = [];
	this.aneNum = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init =function(){

	for(var i = 0; i < ane.num; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNum[i] = 0;
		this.cfu[i] = -1;
		this.spd[i] = Math.random() * 0.017 + 0.003; //[0.003,0.03]
		this.fruitType[i] = "";
	}
	
	this.orange.src = 'res/images/fruit.png';
	this.blue.src = 'res/images/blue.png';
	
}

fruitObj.prototype.draw = function(){
	for(var i = 0; i <= ane.num; i++){
		if(this.alive[i]){
			if(this.fruitType[i] == 'blue'){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
			if(this.l[i] <= 14){//长大

				var No = this.aneNum[i];
				this.x[i] = ane.headX[No];
				this.y[i] = ane.headY[No];
				this.l[i] += this.spd[i] * deltaTime;

			}else{//向上飘
				this.y[i] -= this.spd[i] * 6 * deltaTime;
			}
			
			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

			if(this.y[i] < 10){
				this.alive[i] = false;
			}
		}
		
	}
}


fruitObj.prototype.born = function(i){
	var aneId = this.deletecfu();
	
	this.aneNum[i]=aneId;

	this.cfu[aneId] = -1;
	
	this.l[i] = 0;

	this.alive[i] = true;

	var ran = Math.random();
	if(ran < 0.2){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
	
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;	
}

fruitObj.prototype.deletecfu = function(){
	//去重
	var aneId = Math.floor(Math.random() * ane.num);
	for(var i = 0; i <= this.cfu.length; i++){
		if(this.cfu[i] == aneId) {
			return this.deletecfu();
		}
	}
	this.cfu[aneId] = aneId;
	return aneId;	
}

function fruitMonitor(){
	var num = 0;
	for(var i = 0; i < fruit.num; i++){

		if(fruit.alive[i]) num++;
	}

	if(num < 15){
		sendFruit();
		return;
	}
}

function sendFruit(){
	for(var i = 0; i<fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		};
	}
}