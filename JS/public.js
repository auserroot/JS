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

// 判断arr里面是否含有num
function has(arr,num){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==num){
            return true;
        }
    }
    return false;
}