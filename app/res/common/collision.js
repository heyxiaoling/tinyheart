//碰撞检测


//大鱼和果实的碰撞检测
function momFruitCollision(){
	for(var i = 0; i < fruit.num; i++){
		if(fruit.alive[i]){
			var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			if(l < 900){
				//果实被吃掉
				fruit.dead(i);
			}
		}
	}
}