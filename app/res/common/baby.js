//小鱼
var babyObj = function (){
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();	
}

babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 80;
	this.y = canHeight * 0.5 + 80;
	this.angle = 0;
	this.babyEye.src = 'res/images/babyEye0.png';
	this.babyBody.src = 'res/images/babyFade0.png';
	this.babyTail.src = 'res/images/babyTail0.png';
}

babyObj.prototype.draw = function(){

	//lerp x, y 让小鱼鱼趋近大鱼
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);

	// Math.atan2(); 让小鱼的角度转向大鱼
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	//让大鱼的角度趋近于鼠标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.babyTail, -this.babyTail.width * 0.5 + 24, -this.babyTail.height * 0.5);
	ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);
	ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5, -this.babyEye.height * 0.5-2);
	ctx1.restore();
}

