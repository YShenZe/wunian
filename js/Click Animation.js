function drawStar() {
  //定义数组，arr存放每个小星星的信息，colour为颜色数组，存几个好看的颜色
  var arr = [];
  var colours = ["#ffff00", "#66ffff", "#3399ff", "#99ff00", "#ff9900"];
  var timeoutList = []; // 计时器列表-用于后续清理计时器

  // 创建画布
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  var ctx = canvas.getContext("2d");

  // 让画布自适应窗口大小，这个复制即可
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  // 给画布css样式，固定定位，且阻止用户的鼠标事件
  canvas.style.cssText = `
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    pointer-events: none;
  `;

  // 封装绘制一个五角星函数
  // x是圆心横坐标，y是圆心纵坐标，其实就是鼠标位置（x ，y）
  // r是里面小圆半径 ，l是大圆半径
  // rot是初始旋转角度
  function star(x, y, r, l, rot) {
    ctx.beginPath();
    // 循环5次，因为5个点
    for (let i = 0; i < 5; i++) {
      //先绘制小圆上一个点
      ctx.lineTo(
        Math.cos(((18 + i * 72 - rot) * Math.PI) / 180) * r + x,
        -Math.sin(((18 + i * 72 - rot) * Math.PI) / 180) * r + y
      );
      //连线到大圆上一个点
      ctx.lineTo(
        Math.cos(((54 + i * 72 - rot) * Math.PI) / 180) * l + x,
        -Math.sin(((54 + i * 72 - rot) * Math.PI) / 180) * l + y
      );
    }
    ctx.closePath();
  }

  // 绘制一堆星星
  function draw() {
    //循环数组
    for (let i = 0; i < arr.length; i++) {
      let temp = arr[i];
      //调用绘制一个星星函数
      star(temp.x, temp.y, temp.r, temp.r * 3, temp.rot);
      //星星颜色
      ctx.fillStyle = temp.color;
      //星星边框颜色
      ctx.strokeStyle = temp.color;
      //线宽度
      ctx.lineWidth = 0.1;
      //角有弧度
      ctx.lineJoin = "round";
      // 填充
      ctx.fill();
      // 绘制路径
      ctx.stroke();
    }
  }

  //更新动画
  function update() {
    //循环数组
    for (let i = 0; i < arr.length; i++) {
      // x坐标+dx移动距离
      arr[i].x += arr[i].dx;
      // y坐标+dy移动距离
      arr[i].y += arr[i].dy;
      // 加上旋转角度
      arr[i].rot += arr[i].td;
      // 半径慢慢减小
      arr[i].r -= 0.015;
      // 当半径小于0时
      if (arr[i].r < 0) {
        //删除该星星
        arr.splice(i, 1);
      }
    }
  }

  // 添加当前位置星星数据
  function addStarts(e) {
    // 每移动触发一次事件给arr数组添加一个星星
    arr.push({
      // x是初始横坐标
      x: e.clientX,
      //y是初始纵坐标
      y: e.clientY,
      //r是星星里面那个小圆半径，哪来的小圆等会说
      r: Math.random() * 0.5 + 1.5,
      //运动时旋转的角度
      td: Math.random() * 4 - 2,
      // X轴移动距离
      dx: Math.random() * 2 - 1,
      // y轴移动距离
      dy: Math.random() * 1 + 1,
      // 初始的旋转角度
      rot: Math.random() * 90 + 90,
      // 颜色
      color: colours[Math.floor(Math.random() * colours.length)],
    });
  }

  // 监听屏幕变化事件
  window.onresize = resizeCanvas;

  // 监听鼠标移动事件
  window.addEventListener("mousemove", (e) => {
    // 添加星星数据
    addStarts(e);

    //设置100毫秒内效果
    for (let index = 0; index < 200; index++) {
      if (index === 0 && timeoutList.length > 0) {
        for (const timeoutName of timeoutList) {
          clearTimeout(timeoutName)
        }
      }
      timeoutList[index] = setTimeout(() => {
        //清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //绘制
        draw();
        //更新
        update();
      }, index * 20);
    }
  });
}

drawStar()
/**
* 鼠标按下屏幕上飞出一个花朵的特效
* 日期：2020年12月5日
* littlefean
*/

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

//存放鼠标位置的全局变量
var MOUSE_LOC = null;

var body = document.querySelector('body');
//鼠标移动，实时获取位置并保存到 MOUSE_LOC 中
document.onmousemove = function (e) {
	MOUSE_LOC = { 'x': e.pageX, 'y': e.pageY };
};

//鼠标在屏幕中按下事件
document.onmousedown = function (e) {
	let a = document.createElement('div');
	a.setAttribute('class', 'flower');
	//设置初始css属性
	a.style.zIndex = 500;
	a.style.width = 100 + 'px';
	a.style.height = 100 + 'px';
	a.style.position = 'absolute';
	a.style.backgroundImage = "url('https://download-cdn.cjjd19.com/123-547/94c5a0bf/1845066178-0/94c5a0bf7b645e7a01514eb149d64e23/c-m74?v=5&t=1743317212&s=1743317212423b44d788b893872b6fdd1ef251bc8e&r=0CXD9F&bzc=1&bzs=1845066178&filename=flower1.png&cache_type=1')"; /* 花朵图片的地址 */
	a.style.backgroundRepeat = 'no-repeat';

	/* 花朵位置必须要在鼠标点击位置上面一些，不能遮挡鼠标点击位置，否则按钮点击无效 */
	a.style.top = MOUSE_LOC.y - 10 + 'px';
	a.style.left = MOUSE_LOC.x - 4 + 'px';
	a.style.backgroundSize = '100%';
	console.log('asssssd');

	body.appendChild(a);
	var t = 0;	/* 表示当前动画时间 */
	var roAdd = randomNum(-2, 2); /* 表示当前动画中花朵的旋转方向速度 */
	var size = 100; /* 表示当前动画中花朵的大小 */
	var op = 0.99; /* 表示当前动画中花朵的透明度 */

	//开启花朵上升动画，开启定时器
	var boomAni = setInterval(function () {
		//时间增加
		t++;
		//位置上升
		a.style.top = a.offsetTop - 2 + 'px';
		//角度旋转
		ro += roAdd;
		//css属性更新
		a.style.transform = "rotate(" + ro + "deg)";
		a.style.backgroundSize = size + '%';
		a.style.opacity = op;
		// 体积逐渐减小
		if (size >= 30) {
			size -= 0.5;
		}
		// 透明度逐渐降低
		if (op > 0) {
			op -= 0.01;
		}
		// 时间超时结束动画
		if (t >= 100) {
			a.remove();
			clearInterval(boomAni);
			return;
		}
	}, 1);
}/**
* 鼠标按下屏幕上飞出一个花朵的特效
* 日期：2020年12月5日
* littlefean
*/

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

//存放鼠标位置的全局变量
var MOUSE_LOC = null;

var body = document.querySelector('body');
//鼠标移动，实时获取位置并保存到 MOUSE_LOC 中
document.onmousemove = function (e) {
	MOUSE_LOC = { 'x': e.pageX, 'y': e.pageY };
};

//鼠标在屏幕中按下事件
document.onmousedown = function (e) {
	let a = document.createElement('div');
	a.setAttribute('class', 'flower');
	//设置初始css属性
	a.style.zIndex = 500;
	a.style.width = 30 + 'px';
	a.style.height = 30 + 'px';
	a.style.position = 'absolute';
	a.style.backgroundImage = "url('flower1.png')"; /* 花朵图片的地址 */
	a.style.backgroundRepeat = 'no-repeat';

	/* 花朵位置必须要在鼠标点击位置上面一些，不能遮挡鼠标点击位置，否则按钮点击无效 */
	a.style.top = MOUSE_LOC.y - 10 + 'px';
	a.style.left = MOUSE_LOC.x - 4 + 'px';
	a.style.backgroundSize = '100%';
	console.log('asssssd');

	body.appendChild(a);
	var t = 0;	/* 表示当前动画时间 */
	var ro = 1; /* 表示当前动画中花朵的角度 */
	var roAdd = randomNum(-5, 5); /* 表示当前动画中花朵的旋转方向速度 */
	var size = 100; /* 表示当前动画中花朵的大小 */
	var op = 0.99; /* 表示当前动画中花朵的透明度 */

	//开启花朵上升动画，开启定时器
	var boomAni = setInterval(function () {
		//时间增加
		t++;
		//位置上升
		a.style.top = a.offsetTop - 2 + 'px';
		//css属性更新
		a.style.transform = "rotate(" + ro + "deg)";
		a.style.backgroundSize = size + '%';
		a.style.opacity = op;
		// 体积逐渐减小
		if (size >= 30) {
			size -= 0.5;
		}
		// 透明度逐渐降低
		if (op > 0) {
			op -= 0.01;
		}
		// 时间超时结束动画
		if (t >= 100) {
			a.remove();
			clearInterval(boomAni);
			return;
		}
	}, 1);
}
        // over