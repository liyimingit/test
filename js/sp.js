(function(win,doc){
	var html = doc.documentElement;
	var r = 'orientationchange' in win ? 'orientationchange' : 'resize';
	var calc = function(){
		var danqianWidth = html.clientWidth;
		if(danqianWidth<640){
			html.style.fontSize = 16*(danqianWidth/375) + 'px';
		}else{
			html.style.fontSize = 16 + 'px';
		} 
		if(danqianWidth==768){
			html.style.fontSize = 25 + 'px';
		}else if(danqianWidth == 1024){
			html.style.fontSize = 33 + 'px';
		}
	}
	win.addEventListener(r,calc);
	doc.addEventListener('DOMContentLoaded',calc);
})(window,document);