var 
	can1,
	can2,
	ctx1,
	ctx2;

//时间
var 
	lastTime,
	deltaTime;
//canvas 宽高
var 
	canWidth,
	canHeight;

//背景
var bgPic = new Image();

//海藻
var ane;

//果实
var fruit;

//大鱼
var mom;

//小鱼
var baby;

//鼠标变量
var mx, my;


window.onload = game;


function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	//获得canvas,context
	can1 = document.getElementById('canvas1');
	can2 = document.getElementById('canvas2');
	ctx1 = can1.getContext("2d");
	ctx2 = can2.getContext("2d");

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "res/images/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	baby = new babyObj();

	baby.init();

}

function gameloop(){
	requestAnimFrame(gameloop);

	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	//网页切换的时候deltaTime不停止

	if(deltaTime > 50){
		deltaTime = 50;
	}

	//画背景
	drawBackground();

	//画海藻
	ane.draw();

	//控制果实数量
	fruitMonitor();

	//画出果实
	fruit.draw();

	//清空画布
	ctx1.clearRect(0, 0, canWidth, canHeight);

	//画大鱼
	mom.draw();

	//大鱼和果实的碰撞
	momFruitCollision();

	//画小鱼
	baby.draw();
}


function onMouseMove(e){
	if(e.offsetX || e.layerX){
		mx = e.offsetX == undefined ? e.layerX : e.offsetX;
		my = e.offsetY == undefined ? e.layerY : e.offsetY;
	}
}