// 随机产生一个min到max之间的随机整数
function rand(min,max){            
    return parseInt(Math.random()*(max-min+1))+min;
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