window.onload = function(){
	var num = 90;
	var text = document.getElementById('text');
	var page = document.getElementsByClassName('page');
	var audio = document.getElementById('audio');
	var yin = document.getElementById('yin');
	var name = document.getElementById('name');
	var zhiye = document.getElementById('zhiye');
	var tk = document.getElementById('tk');
	var back = document.getElementById('back');
	var ti = document.getElementById('ti');
	var list = document.getElementById('list');
	var li = list.getElementsByTagName('li');
	var xianshi = document.getElementById('xianshi')
	var tktwo = document.getElementById('tktwo');
	var n = document.getElementById('n');
	var scose = document.getElementById('scose');
	var chengji = document.getElementById('chengji');
	var tktu = document.getElementById('tktu');
	var key = false;
	var startY,endY,Y;
	var index = 0;
	var tid = setInterval(function(){
		num++;
		text.innerHTML = num + "%";
		if(num>=100){
			clearInterval(tid);
			num = 100;
			index++;
			fanye(index);
			yinyue();
			huadong();
		}
	},100);
	
	function yinyue(){
		yin.onclick = function(){
			if(key){
				audio.pause();
				key = false;
				yin.style.animationPlayState = 'paused';
				yin.src = 'images/bgm%20off.png'
			}else{
				key = true;
				audio.play();
				yin.style.animationPlayState = 'running';
				yin.src = 'images/bgm%20on.png'
			}
		}
	}
	
	function fanye(i){
		if(i<page.length){
			page[i].style.display = 'block';
			page[i-1].style.display = 'none';
		}
	}
	
	
	function huadong(){
		window.addEventListener('touchstart',function(e){
			startY = e.touches[0].pageY;
		})
		
		window.addEventListener('touchend',function(e){
			endY = e.changedTouches[0].pageY;
			Y = startY - endY;
			if(Y>150){//下一页
				if(index>=1&&index<3){
					index++;
					fanye(index);
					setTimeout(function(){
						if(index==3){
							main();
						}
					},500)
				}
			}else if(Y<-150){//上一页
					
			}else{
				console.log('操作幅度太小')
			}
		})
	}
	
	function main(){
		console.log(zhiye.value)
		ti.onclick = function(){
			if(zhiye.value == '学生') {
				li[8].innerHTML = '软糖';
				li[9].innerHTML = '雪糕';
				li[10].innerHTML = '辣条';
			}else{
				li[8].innerHTML = '素食';
				li[9].innerHTML = '米粉';
				li[10].innerHTML = '煎饼';
			}
			if(name.value == ''){
				tk.style.display = 'block';
				tk.onclick = function (){
				tk.style.display = 'none';
				}
			}else if(name.value.length>=2&&name.value.length<=4){
				index++;
				fanye(index);
				if(index==4){
					back.onclick = function(){
						page[4].style.display = 'none';
						page[3].style.display = 'block';
						name.value = '';
						index--;
					}
					calculate();
				}
			}else{
				alert('至少输入2-4个字符')
			}
		}
		
		
	}
	
	function calculate(){
		var result = 0;//当前输入的值
		var tmp = 0;//上一次的结果
		var noNumFlag = false;//是否是按了数字的标识
		var count = 0;//加号限定次数
		var cj = '';//成绩
		var keytwo = false;//限定等号次数标识
		var j = 0;
		var againwhite = false;//是否再次按了白色按钮
		var threeNum = false;//是否按了第三个数
		var lastxianshi = '';
		for(let i = 0; i<li.length ; i++){//i=3为ac 7为+ 11为=   i=8 9 10 +50   i=012 567 +100
			li[i].onclick = function(){//i=0 1 2 3 4 5 6 7 8 9 10 11  
				if(li[i].innerHTML == '晒晒健康值'){
						tktwo.style.display = 'block';
						tktwo.onclick = function(){
							tktwo.style.display = 'none';
						}
				}
				li[i].style.background = 'gray';
				if(i==3||i==7||i==11){//黄色按键
					setTimeout(function(){
						li[i].style.background = 'gold';
					},100)
					if(i==3){//ac
						j=0;
						againwhite = false;
						count = 0;
						result = 0;
						tmp = 0;
						cj='';
						threeNum = false;
						li[11].innerHTML = '=';
						keytwo = false;
						noNumFlag = false;
						lastxianshi = '';
						xianshi.innerHTML = '请点击按键开始计算';
						for(let i = 0; i<li.length ; i++){
							li[i].style.background = 'white';
							if(i==3||i==7||i==11){
								if(i==3){
									li[i].style.background = 'gray';
									setTimeout(function(){
										li[i].style.background = 'gold';
									},100)
								}else{
									li[i].style.background = 'gold';
								}
							}
							li[i].style.pointerEvents = 'auto';
						}
					}else if(i==7){//+
						if(xianshi.innerHTML != '请点击按键开始计算'&&noNumFlag==false){
							againwhite = false;
							console.log(againwhite);
							count++;
							if(count<3){
								result = tmp + result;
								tmp = result;
								xianshi.innerHTML += '+';
								lastxianshi = xianshi.innerHTML;
							}
						}
					}else{//=
						if(keytwo==false&&count>=2&&threeNum){
							result = tmp + result;
							if(result<=150){
								cj = '差劲';
								tktu.src = 'images/差.png'
							}else if(result<=250){
								cj = '良好';
								tktu.src = 'images/良.png'
							}else{
								cj = '优秀';
								tktu.src = 'images/优.png'
							}
							n.innerHTML = name.value;
							chengji.innerHTML = cj;
							scose.innerHTML = result;	
							xianshi.innerHTML += '=' + result + "<br>" + cj;
							li[i].innerHTML = '晒晒健康值';
							keytwo = true;
							for(let o = 0; o<li.length;o++){
								if(o==3||o==11){
									
								}else{
									li[o].style.pointerEvents = 'none';
								}
							}
						}
					}
					noNumFlag = true;
				}else{//白色按键
						if(i>=8&&i<=10){//+50
							result =50;
						}else{//+100
							result =100;
						}
						if(xianshi.innerHTML == '请点击按键开始计算'){
							xianshi.innerHTML = result;
						}else if(noNumFlag){
							if(count<3){
								xianshi.innerHTML += result;
								if(count==2){
									threeNum = true;
								}
							}
						}
						
						if(againwhite||count>=3){
							if(count==1||count==2||count>=3){
								xianshi.innerHTML =lastxianshi + result;
							}else{
								xianshi.innerHTML = result;
							}
							li[j].style.background = 'white'
						}
						againwhite = true;
						noNumFlag = false;
						j=i;
				}
			}
		}
	}
}