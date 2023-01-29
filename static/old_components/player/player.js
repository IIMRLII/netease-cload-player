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
window.mousePlayerFlag = false;
window.volumeRangeFlag = false;

$(document).ready(function(){
    
    //监听进度滑块，可以拖动
    $("#range").on('change',function(){
        let player = document.getElementById("player");
        player.currentTime = this.value;
    });

    $("#range").mousedown(function () { 
        window.mousePlayerFlag = true;
    });

    $("#range").mouseup(function () { 
        window.mousePlayerFlag = false;
    });

    $("#range").on("touchstart", function () { 
        window.mousePlayerFlag = true;
    });

    $("#range").on("touchend", function () { 
        window.mousePlayerFlag = false;
    });

    //监听音量滑块，可以拖动
    $("#volumerange").on('change',function(){
        let player = document.getElementById("player");
        player.volume = $("#volumerange").val() / 100;
        // $("#volumerange").val(this.value);
    });

    $("#volumerange").mousedown(function () { 
        window.volumeRangeFlag = true;
    });

    $("#volumerange").mouseup(function () { 
        window.volumeRangeFlag = false;
    });

    $("#volumerange").on("touchstart", function () { 
        window.volumeRangeFlag = true;
    });

    $("#volumerange").on("touchend", function () { 
        window.volumeRangeFlag = false;
    });

});

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