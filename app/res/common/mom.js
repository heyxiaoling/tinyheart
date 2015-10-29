var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();	
}

momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	this.bigEye.src = 'res/images/bigEye0.png';
	this.bigBody.src = 'res/images/bigSwim0.png';
	this.bigTail.src = 'res/images/bigTail0.png';
}

momObj.prototype.draw = function(){
	//lerp x, y 让大鱼趋近鼠标
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	// Math.atan2(); 让大鱼的角度转向鼠标
	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	//让大鱼的角度趋近于鼠标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	
	ctx1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 28, -this.bigTail.height * 0.5);
	ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
	ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5-2);
	ctx1.restore();
}