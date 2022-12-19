var synchroTime = 0;

function synchronization(that){

    synchroTime++;

    if(document.getElementById("RtxSwitch").innerHTML == "RtxOn"){//全体染色

        let color = rainBow(synchroTime % 50 / 50);
        let r = color.red;
        let g = color.green;
        let b = color.blue;
        $("*").css("color","rgb(" + r + "," + g + ","  + b +")");

        let antiColor = anticolor(r,g,b);
        $("*").css("border-color","rgb(" + antiColor.red + "," + antiColor.green + ","  + antiColor.blue +")");

        // $("*").css("background-color", "red");
        $("#RtxSwitch").css("width", Math.sin(synchroTime / 10) * 20 + 120);
        $("#RtxSwitch").css("height", Math.sin(synchroTime / 10) * 5 + 40);
        $("#RtxSwitch").css("font-size", Math.sin(synchroTime / 10) * 3 + 20);
        $("#RtxSwitch").css("line-height", Math.sin(synchroTime / 10) * 5 + 40 + "px");
    }else{
        $("*").css("color","");
        $("*").css("border-color","");
    }

    getLine();//显示歌词

    let player = document.getElementById("player");
    let play = document.getElementById("play");

    $("#range").attr({'max':player.duration});
    $('#cur').text(timeToStr($("#range")[0].value));

    if(mousePlayerFlag){
        player.currentTime = $("#range")[0].value;
        ppxx = $("#lrcbg").height() / 2 + $("#top").height() / 2 - 30 - (currentLine * 40);
        deltaTimer[0] = new Counter(40, 1000 / 20 * 0.5, -1);//del0--歌词自动滑动
    }else{
        $("#range").val(parseInt(Math.round(player.currentTime)));
    }

    var audioPlayer = document.querySelector('#player');
    if(audioPlayer.paused){
        play.title = "play"
        play.style.backgroundImage = 'url("player/play.png")';
    }else{
        play.title = "pause"
        play.style.backgroundImage = 'url("player/pause.png")';
    }

    if(that.showSuggest){
        $("#searchSuggest").css("visibility","visible");
    }else{
        $("#searchSuggest").css("visibility","hidden");
    }
    
    if(that.isRecommend){
        $("#recommend").css("visibility","visible");
    }else{
        $("#recommend").css("visibility","hidden");
    }

}
