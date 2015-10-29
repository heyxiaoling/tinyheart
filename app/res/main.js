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

//小鱼尾巴
var babyTail = []; 

//大鱼尾巴
var bigTail = [];


//小鱼眼睛
var babyEye = [];

//大鱼眼睛
var bigEye = [];


//小鱼身体
var babyBody = [];

//
var data;

//大鱼身体

var bigBodyOra = [];

var bigBodyBle = [];

//大鱼吃果实圈圈
var wave;

//大鱼碰小鱼圈圈
var halo;

//漂浮物
var dust;

//漂浮物图片
var dustPic = [];


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

	//初始化海藻
	ane = new aneObj();
	ane.init();

	//初始化海藻
	fruit = new fruitObj();
	fruit.init();

	//初始化大鱼
	mom = new momObj();
	mom.init();

	//初始化小鱼
	baby = new babyObj();
	baby.init();

	//把变量定在中心
	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	//
	data = new dataObj();

	//初始化小鱼,大鱼尾巴
	for(var i = 0; i < 8;i++){
		babyTail[i] = new Image();
		babyTail[i].src = 'res/images/babyTail'+i+'.png';
		bigTail[i] = new Image();
		bigTail[i].src = 'res/images/bigTail'+i+'.png';
	}

	//初始化大鱼眼睛，小鱼眼睛
	for(var i = 0; i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = 'res/images/babyEye'+i+'.png';
		bigEye[i] = new Image();
		bigEye[i].src = 'res/images/bigEye'+i+'.png';
	}

	//初始化小鱼身体
	for(var i = 0; i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = 'res/images/babyFade'+i+'.png';
	}

	//初始化大鱼身体

	for(var i = 0; i < 8; i++){
		bigBodyOra[i] = new Image();
		bigBodyOra[i].src = 'res/images/bigSwim'+i+'.png';
		bigBodyBle[i] = new Image();
		bigBodyBle[i].src = 'res/images/bigSwimBlue'+i+'.png';
	}
	//初始化大鱼吃果实圈圈
	wave = new waveObj();
	wave.init();

	//初始化大鱼碰小鱼圈圈
	halo = new haloObj();
	halo.init();

	//漂浮物图片初始化
	for(var i = 0; i < 7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = 'res/images/dust'+ i +'.png';
	}

	//初始化漂浮物对象
	dust = new dustObj();
	dust.init();

	ctx1.textAlign = "center";
	ctx1.font = "20px Verdana";
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

	//大鱼和小鱼碰撞
	momBabyCollision();

	//
	data.draw();

	//画大鱼吃果实圈圈
	wave.draw();

	//画大鱼碰小鱼圈圈
	halo.draw();

	//画漂浮物
	dust.draw();
}


function onMouseMove(e){
	if(!data.gameOver){
		if(e.offsetX || e.layerX){
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
}