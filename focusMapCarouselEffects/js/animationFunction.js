window.onload=function(){
	var container=document.getElementById("container");
	var list=document.getElementById("list");
	var buttons=document.getElementById("buttons").getElementsByTagName("span");
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	var index=1;
	var animated=false;//定义是否正在动画的标志
	//此函数通过传递index参数，设置圆圈按钮二等高亮状态
	function showButton(index){
		for(var i=0,len=buttons.length;i<len;i++){
			if(buttons[i].className=='on'){
				buttons[i].className=''
			;
				break;
			}
		}
		buttons[index-1].className='on';
	}
	//此函数通过传递一个偏移量参数，改变列表容器的left值来切换图片
	function animate(offset){
		animated=true;
		var newLeft=parseInt(list.style.left)+offset;
		var time=300;//位移总时间
		var interval=10;//位移间隔时间
		var speed=offset/(time/interval);//求出每一次的位移量
		//位移之前做一下判断，什么时候需要进行位移
		//(speed < 0 && parseInt(list.style.left) > newLeft)||((speed > 0 && parseInt(list.style.left) < newLeft)
		function go(){
			if(speed<0&&parseInt(list.style.left)>newLeft||speed>0&&parseInt(list.style.left)<newLeft) {
				list.style.left=parseInt(list.style.left)+speed+'px';	
				setTimeout(go,interval);
			}
			else{
				animated=false;
				list.style.left=newLeft+"px";
				if(newLeft>-600){
					list.style.left=-3000+'px';	
				}
				if(newLeft<-3000){
					list.style.left=-600+'px';	
				}
			}
		}
		go();
		// debugger;
	}
	//点击向右按钮时，触发点击事件
	next.onclick=function(){
		if(index==5){
			index=1;
		}
		else{
			index+=1;
		}		
		showButton(index);
		if(!animated){
			animate(-600);
		}
		
	};
	//点击向左按钮时触发点击事件
	prev.onclick=function(){
		if(index==1){
			index=5;
		}
		else{
			index-=1;
		}	
		showButton(index);
		if(!animated){
			animate(600);
		}
	};
	for(var i=0,len=buttons.length;i<len;i++){
		//圆圈按钮点击效果
		buttons[i].onclick=function(){
			if(this.className=='on'){
				return;//当程序运行到这里的时候退出这个函数
			}
			var myIndex=parseInt(this.getAttribute('index'));
			// console.log(index);
			var offset=-600*(myIndex-index);
			if(!animated){
				animate(offset);
			}
			index=myIndex;
			showButton(index);
			// debugger;
		};
	}
};