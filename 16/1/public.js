//传入元素id,返回指定id元素
function $id(id){
    return document.getElementById(id)
}

//生成一个n到m之间的随机整数
function rand(n,m){
    return n+parseInt(Math.random()*(m-n+1));
}

//生成一个16进制的随机颜色
function color(){
    var result= "#";
    for(var i=0;i<6;i++){
        result += rand(0,15).toString(16)
        // 把十进制的数字变成十六进制的字符串:0 1 ...9 a b c d f
    }
    return result;
}

//传入一个数组和一个元素,判断数组中是否存在该元素,存在返回true,不存在返回false
function has(arr,data){
    for(var i=0;i<arr.length;i++){
        if(data===arr[i]){
            //continue和break;
            //在此处,循环在函数中,return终止了函数执行,就是终止了循环
            return true;
        }
    }
    //如果函数能运行到此处,说明没有终止函数
    return false;
}
//传入一个数组,返回数组去重以后的结果,不改变原数组
function norepeat(arr){
    var result = [];
    for(var i=0;i<arr.length;i++){
        if(!has(result,arr[i])){
            //如果进入此处,说明arr[i]在result里面不存在,可以放进去
            result.push(arr[i])
        }
    }
    return result;
}

//格式化时间:YYYY-MM-DD HH-mm-ss
//times是一个时间戳:指定时间距离格林威治时间的毫秒数,是可选参数
function formatDate(times){
    
    var time = new Date;
    if(times){
        //如果进入此处,说明time有实参赋值,因为如果没有实参赋值,他是undefined
        //如果传入参数,表示不是当前时间,是你指定的时间
        time.setTime(times)
    }
    //年
    var year = time.getFullYear();
    //月
    var month = time.getMonth()+1;//month取值0-11之间,显示要变成1-12之间,所以+1
    //如果月份是一位数,前面要补0;
    month = month<10?"0"+month:month;
    //日
    var date = time.getDate();
    //如果日是一位数,前面要补0;
    date = date<10?"0"+date:date;
    //小时
    var hour = time.getHours();
    hour = hour<10?"0"+hour:hour;
    //分
    var minute = time.getMinutes();
    minute = minute<10?"0"+minute:minute;
    //秒
    var second = time.getSeconds();
    second = second<10?"0"+second:second;
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

//获取滚动的距离{top:"",left:""}

function getScroll(){
    if(window.pageYOffset){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.documentElement.scrollLeft){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else{
        return {
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
}
//获取指定dom的指定样式值
function getStyle(dom,attr){
    if(window.getComputedStyle){
        //如果window.getComputedStyle不是undefined,说明是非IE浏览器
        return window.getComputedStyle(dom,null)[attr];
    }else{
        //如果window.getComputedStyle是undefined,说明是IE浏览器
        return dom.currentStyle[attr]
    }
    
}
// move:让指定元素的多属性匀速运动到指定目标
function move(obj,json,fn){  
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var flag = true;// 当开关变量的值为 true时，运动结束，可以停止定时器了		
        for(var attr in json){		
            var current = 0;
            if(attr == "opacity"){
                //操作透明度
                current = parseFloat( getStyle( obj,attr ) ) * 100;
            }else if( attr == "zIndex" ){
                current = parseInt( getStyle(obj,attr) );//操作空间定位
            }else{
                
                //操作的是带有像素值的样式
                current = parseInt( getStyle(obj,attr) );//获取当前操作对象的实际值
            }
            var speed = (json[attr] - current) > 0 ? 1 : -1;
            //speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            if( json[attr] != current ){
                //如果目标值 和 当前操作的样式值不相等，就不能停止定时器 
                flag = false;				
            }
            //上面的条件不满足  继续执行运动
            if(attr == "opacity"){
                //操作透明度
                obj.style.opacity = (current + speed) / 100;
                obj.style.filter = "alpha(opacity="+(current + speed)+")";
            }else if(attr == "zIndex"){
                obj.style.zIndex = json[attr] ;
            }else{
                //操作的是带有像素值的样式
                obj.style[attr] = current + speed + "px";
                    
            }		
        }		
        //如果flag为true   就停止定时器		
        if(flag){
            clearInterval(obj.timer);
            //一个动作完成后,进入下一个动作(也就是要调用下一个函数)
            if(fn){ //判断如果有函数传递过来，就调用
                fn();
            }
        }
        
    },10)
}
/* 
    animate:让指定元素的多属性同时缓动到指定目标
        ==>参数1:dom  要缓动的元素节点
        ==>参数2:json 
            {
                width:400,
                height:500,
                left:300,
                top:200,
                opacity:90,
                zIndex:9 
            }
        ==>参数3:fn  动画完成以后执行的函数
*/
function animate(dom,json,fn){
    clearInterval(dom.timer)
    //每隔一段时间,json里面的每个属性都变化一点
    dom.timer = setInterval(function(){
        //每次运动开始
        var flag = true;//如果后面有哪个属性没有到达目标位置,就把flag变成false
        //json里面有几个键值对,就要运动几次
        for(var attr in json){
            //1 获取当前位置
            if(attr=="opacity"){
                var current = parseInt(getStyle(dom,attr)*100)
            }else{
                var current = parseInt(getStyle(dom,attr))
            }
            //2 计算速度
            var target = parseInt(json[attr]);
            var speed = target>current?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            //3 计算下一次位置
            if(attr=="zIndex"){
                var next = target;//如果缓动的属性是zIndex,直接一步到位,不用缓动
            }else{
                var next = current + speed;
            }
            //4 定位元素
            if(attr=='opacity'){
                dom.style.opacity=next/100;
                dom.style.filter = "alpha(opacity="+next+")"
            }else if(attr=='zIndex'){
                dom.style.zIndex = next;
            }else{
                dom.style[attr] = next+"px";
            }
            if(next!=target){
                flag = false;
            }
            
        }
        //本次运动结束,检查flag的值
        if(flag){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
    },1000/60)
}


//测算元素距离页面的距离
function getDistance(dom){
	var totalLeft = 0;
	var totalTop = 0;
	do{
		totalLeft+= dom.offsetLeft;
		totalTop+=dom.offsetTop;
		//下一次的dom节点就是本次dom节点的最近的有定位的父元素
		dom = dom.offsetParent;
	}while(dom.nodeName!="BODY")			

	return {
		left:totalLeft,
		top:totalTop
	}

}

//事件监听
function addEvent(dom,type,fn){
	if(dom.addEventListener){
		//说明dom 上有addEventListener这个属性
		dom.addEventListener(type,fn)
	}else{
		//说明是IE678
		dom.attachEvent("on"+type,fn)
	}
}


//封装一个函数,返回鼠标按键,要求:左0  中1  右2
function getButton(e){
	//普通的函数
	if(e){
		//如果接到的e确实有值,说明e不是undefined,说明当前浏览器不是IE678
		return e.button;
	}else{
		//就是IE678
		switch(window.event.button){
			case 1:
				return 0;
			case 4:
				return 1;
			case 2:
				return 2;
		}
	}
}