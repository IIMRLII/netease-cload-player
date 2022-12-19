//将秒数转为00:00格式
function timeToStr(time) {
    var m = 0,
    s = 0,
    _m = '00',
    _s = '00';
    time = Math.floor(time % 3600);
    m = Math.floor(time / 60);
    s = Math.floor(time % 60);
    _s = s < 10 ? '0' + s : s + '';
    _m = m < 10 ? '0' + m : m + '';
    return _m + ":" + _s;
}

// vue会重新渲染dom,加上是异步实例vue.所以正常写程序的话jq的$()获取的元素不是vue渲染后的元素. 
// 解决办法：
// 先加载vue.js，让页面渲染完成后加载jq，给jq绑定ready事件
var mousePlayerFlag = false;

$(document).ready(function(){
    
    //监听进度滑块，可以拖动
    $("#range").on('change',function(){
        let player = document.getElementById("player");
        player.currentTime = this.value;
    });

    $("#range").mousedown(function () { 
        mousePlayerFlag = true;
    });

    $("#range").mouseup(function () { 
        mousePlayerFlag = false;
    });

    //监听音量滑块，可以拖动
    $("#volumerange").on('change',function(){
        let player = document.getElementById("player");
        player.volume = this.value / 100;
        $("#volumerange").val(this.value);
    });

});

function getcover(song){//获取封面
    if(song.al && song.al.id){
        axios.get('/album?id=' + song.al.id).then((response)=>{
            for(let i = 0;i < response.data.songs.length;i++){
                if(response.data.songs[i].al.id == song.al.id)
                document.getElementById("curcover").src = response.data.songs[i].al.picUrl + "?param=120y120?";
                break;
            }
        })
    }
}

var playertime = 0;
setInterval(() => {//给player背景设置动画特效
    let dat = new Date();
    playertime += document.getElementById("play").title == "play" ? 2 : 5;
    if(document.getElementById("RtxSwitch").innerHTML == "RtxOn"){
        playertime += 10;
    }
    if(document.getElementById("RtxSwitch").innerHTML == "RtxOn"){
        $("#playerdiv").css("backgroundPosition",(-playertime / 10) + "px" + " " + Math.sin(playertime / 150) * 40 + "px")
    }else{
        $("#playerdiv").css("backgroundPosition",(-playertime / 10) + "px" + " " + (-playertime / 10) + "px")
    }
}, 20);