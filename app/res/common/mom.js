var momObj = function(){
	this.x;
	this.y;
	this.angle;

	this.bigTailTimer = 0;
	this.bigTailCount = 0;

	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;

	this.bigBodyCount = 0;	
}

momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}

momObj.prototype.draw = function(){
	//lerp x, y 让大鱼趋近鼠标
	this.x = lerpDistance(mx, this.x, 0.96);
	this.y = lerpDistance(my, this.y, 0.96);

	// Math.atan2(); 让大鱼的角度转向鼠标
	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	//让大鱼的角度趋近于鼠标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//大鱼尾巴摇动
	this.bigTailTimer += deltaTime;

	if(this.bigTailTimer > 50){
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}

	//大鱼眼睛眨动
	this.bigEyeTimer += deltaTime;

	if(this.bigEyeTimer > this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;
		if(this.bigEyeCount == 0){
			this.bigEyeInterval = Math.random() * 1600 + 2100;
		}else{
			this.bigEyeInterval = 200;
		}
	}

	//大鱼身体

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var bigTailCount = this.bigTailCount;
	ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width * 0.5 + 28, -bigTail[bigTailCount].height * 0.5);

	var bigBodyCount = this.bigBodyCount;
	if(data.double == 1){
		//黄色果实
		ctx1.drawImage(bigBodyOra[bigBodyCount], -bigBodyOra[bigBodyCount].width * 0.5, -bigBodyOra[bigBodyCount].height * 0.5);
	}else{
		//蓝色果实
		ctx1.drawImage(bigBodyBle[bigBodyCount], -bigBodyBle[bigBodyCount].width * 0.5, -bigBodyBle[bigBodyCount].height * 0.5);
	}
	

	var bigEyeCount = this.bigEyeCount;
	ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width * 0.5, -bigEye[bigEyeCount].height * 0.5-2);
	ctx1.restore();
}