//碰撞检测


//大鱼和果实的碰撞检测
function momFruitCollision(){
	for(var i = 0; i < fruit.num; i++){
		if(!data.gameOver){
			if(fruit.alive[i]){
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if(l < 900){
					//果实被吃掉
					fruit.dead(i);
					//生成圈圈
					wave.born(fruit.x[i], fruit.y[i]);
					//数据更新
					data.fruitNum++;
					mom.bigBodyCount++;

					if(mom.bigBodyCount > 7){
						mom.bigBodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue"){
						data.double += 1;
					}
				}
			}
		}	
	}
}


//大鱼和小鱼碰撞
function momBabyCollision(){
	if(data.fruitNum > 0 || data.double > 0 && !data.gameOver){ //判断大鱼是否有果实
		var l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if(l < 900){
			//小鱼恢复颜色
			baby.babyBodyCount = 0;

			//生成圈圈
			halo.born(baby.x, baby.y);

			//碰撞后颜色
			mom.bigBodyCount = 0;

			//分数变化
			data.addScore();
		}
	}
	
}