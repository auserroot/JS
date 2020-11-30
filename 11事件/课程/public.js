// 随机产生一个min到max之间的随机整数
function rand(min,max){            
    return parseInt(Math.random()*(max-min+1))+min;
}

// 封装一个生成随机颜色的函数
function getColor(){
    var color = "#"
    for(var i=0;i<6;i++){
        color+=rand(0,15).toString(16)
    };
    return color;
}

// 根据id返回给id对应的元素标签
function $id(id){
    return document.getElementById(id);
}

// 封装一个方法用来获取页面滚动的距离
function getScroll(){
    if(window.pageYOffset){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.documentElement.scrollTop){
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

// 封装一个函数来返回指定元素的指定样式
function getStyle(dom,attr){
    if(window.getComputedStyle){
        // 如果能进这里，非IE，说明window.getComputedStyle存在
        return window.getComputedStyle(dom,null)[attr]
    }else{
        // 如果进这里，IE浏览器
        return dom.currentStyle[attr]

    }
}

// 判断arr里面是否含有num
function has(arr,num){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==num){
            return true;
        }
    }
    return false;
}

// 随机产生一个包含n个字母或数字的字符串
function randChar(n){
    var str = "";//用来记录随机字符串集合
    for(var i=0;i<n;i++){	
        // 所以先随机产生一个48-122之间的随机整数
        var code = rand(48,122)
        if((code>57&&code<65)||(code>90&&code<97)){
            // 如果产生的编码不是数字或字符，本次作废
            i--; 
        }else{
            // 如果产生的编码是数字或字符，可以
            var char = String.fromCharCode(code);
            str+=char;
        }
    }
    return str;
}