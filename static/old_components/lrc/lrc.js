var lrc = "";

var currentTime = 0;
var currentLine = 0;

var cursonglrc = new Array();

var songlrc = function (time, words) {
    this.time = time;
    this.words = words;
}

var deltaTimer = new Array();
//del0--歌词自动滑动
//del1--鼠标滑动歌词
function Counter(delta, time, asc) {
    this.delta = delta;
    this.curdelta = delta;
    this.time = time;
    this.curtime = time;
    this.asc = asc;
}

function get_timeAndlrc(lrc) {//歌词解码
    var all = lrc.split('\n');
    cursonglrc = [];
    document.getElementById('lrc').innerHTML = "";

    var lrcexp = /\[[^\]]+\]/;
    for (let j = all.length - 1; j >= 0; j--) {
        if (lrcexp.test(all[j])) {
            continue;
        } else {
            all.splice(j, 1);
        }
    }

    let i = 0;
    let str = "";

    for (; i < all.length; i++) {
        str = all[i].match(lrcexp)[0];

        if (all[i].substring(str.length) == "") {
            cursonglrc.push(new songlrc(time_conversion(str.slice(1, str.length - 1)), ""));
            document.getElementById('lrc').innerHTML += '<li id = "slilrc' + i + '"><p id = "slrc' + i + '">' + '<br>' + '</p></li>';
        } else {
            cursonglrc.push(new songlrc(time_conversion(str.slice(1, str.length - 1)), all[i].substring(str.length)));
            document.getElementById('lrc').innerHTML += '<li id = "slilrc' + i + '"><p id = "slrc' + i + '">' + cursonglrc[i].words + '</p></li>';
        }
    }

    let player = document.getElementById("player");
    let lastlrc = setInterval(function () {//歌词文件结尾处理
        if (player.duration) {
            cursonglrc.push(new songlrc(player.duration, ""));
            document.getElementById('lrc').innerHTML += '<li id = "lislrc' + i + '"><p id = "slrc' + i + '"></p></li>';
            clearInterval(lastlrc);
        }
    }, 1000)
}

/*将00:00.000时间转化为以秒计*/
function time_conversion(time) {
    return parseFloat(time.substring(0, 2)) * 60 + parseFloat(time.substring(3));
}

$(document).ready(function () {

    var scrollFunc = function (e) {//添加鼠标滚动监听事件
        // if (Object.prototype.toString.call(e.target) == "[object HTMLHtmlElement]" && e.wheelDelta) {//IE/Opera/Chrome
        if (e.target.id === 'thecomments' && e.wheelDelta) {//IE/Opera/Chrome
            deltaTimer[1] = new Counter(e.wheelDelta / 5, 1000 / 20 * 1, -1);//del1--鼠标滑动歌词
            e.stopPropagation();
        }
    }
    /*注册事件*/
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }//W3C
    document.onmousewheel = scrollFunc;

    // 移动端滑动适配
    let startX,startY,moveEndX,moveEndY,X,Y;

    $(document).on("touchstart", function (e) {
        if (e.target.id === 'thecomments') {
            startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
        }
        // e.preventDefault();
    });
    $(document).on("touchmove", function (e) {
        // e.preventDefault();
        if (e.target.id === 'thecomments') {
            moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;

            if (Math.abs(Y) > Math.abs(X)) {
                deltaTimer[1] = new Counter(10 * Y / 5, 1000 / 20 * 1, -1);//del1--鼠标滑动歌词
            }

            startX = moveEndX;
            startY = moveEndY;
        }

        // if (Math.abs(X) > Math.abs(Y) && X > 0) {
        //     // console.log("向右滑动");
        // }
        // else if (Math.abs(X) > Math.abs(Y) && X < 0) {
        //     // console.log("向左滑动");
        // }
        // else 
        // if (Math.abs(Y) > Math.abs(X) && Y > 0) {
        //     // console.log("向下滑动");
        //     deltaTimer[1] = new Counter(10 * Y / 5, 1000 / 20 * 1, -1);//del1--鼠标滑动歌词
        // }
        // else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
        //     // console.log("向上滑动");
        //     deltaTimer[1] = new Counter(10 * Y / 5, 1000 / 20 * 1, -1);//del1--鼠标滑动歌词

        // }
        // else {
        //     // console.log("just touch");
        // }
    });


})

var ppxx = $("#lrcbg").height() / 2 + $("#top").height() / 2 - 30 - (currentLine * 40);

let player = document.getElementById("player");
player.onseeking = function () {
    ppxx = $("#lrcbg").height() / 2 + $("#top").height() / 2 - 30 - (currentLine * 40);
    deltaTimer.splice(deltaTimer.length - 1, 1);
}

function deltaCounter() {//反函数递减数
    for (let i = deltaTimer.length; i > 0; i--) {
        let d = deltaTimer[i - 1];
        if (deltaTimer[i - 1]) {
            d.curdelta = d.delta - 1 / (d.time - d.curtime + 1) * d.delta;
            if (d.asc == -1) d.curdelta = d.delta - d.curdelta;
            if (d.asc == 1 && Math.abs(d.delta - d.curdelta) < 0.5) d.curdelta = d.delta;
            if (d.asc == -1 && Math.abs(d.curdelta) < 0.5) d.curdelta = 0;
            if (d.curtime > 0) {
                d.curtime--;
            } else {
                if (d.asc == 1) d.curdelta = d.delta;
                if (d.asc == -1) d.curdelta = 0;
            }
        }
        // if(d.curtime <= 0)deltaTimer.splice(i,1);
    }
}

setInterval("deltaCounter()", 20);

function getLine() {
    var perc;

    let player = document.getElementById("player");
    currentTime = player.currentTime;

    if (cursonglrc.length > 0) {
        if (currentTime <= cursonglrc[0].time) perc = 0;
        for (j = 0; j < cursonglrc.length - 1; j++) {
            if (currentTime >= cursonglrc[j].time && currentTime <= cursonglrc[j + 1].time) {
                if (currentLine != j) {
                    currentLine = j;
                    //判断是否锁定行
                    if (ppxx + (deltaTimer[1] ? deltaTimer[1].curdelta : 0) > $("#lrcbg").height() / 2 + $("#top").height() / 2 - 30 - (currentLine * 40)) {
                        ppxx = $("#lrcbg").height() / 2 + $("#top").height() / 2 - 30 - (currentLine * 40);
                        deltaTimer[0] = new Counter(40, 1000 / 20 * 0.5, -1);//del0--歌词自动滑动
                    }
                }

                perc = (currentTime - cursonglrc[j].time) / (cursonglrc[j + 1].time - cursonglrc[j].time);//当前歌词粒子效果 变白

                // let patpos = document.getElementById("slrc" + currentLine).getBoundingClientRect();
                // if(Math.random() < 0.5){
                //     let vx = 1 * (Math.random() - 0.5);
                //     let vy = 1 * (Math.random() - 0.5);
                //     let time = 80 + 20 * Math.random();
                //     mouseParticle.push(new partical(patpos.x + patpos.width * perc, patpos.y + patpos.height * Math.random(), time, vx, vy, 0, 0, 5, 0, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255, 255, 255, Math.random() * 2 * Math.PI * 3, 0))
                // }

                break;
            }
        }
    }

    ppxx += (deltaTimer[1] ? deltaTimer[1].curdelta : 0);//鼠标滑动

    let dellrc = ppxx + (deltaTimer[0] ? deltaTimer[0].curdelta : 0);//自动滑动

    let baseh = $("#lrcbg").height() / 2 + $("#top").height() / 2 - 30;

    if (dellrc > baseh) {//限制滑动区域
        dellrc = baseh;
        ppxx = dellrc;
    } else if (dellrc < baseh - 40 * cursonglrc.length) {
        dellrc = baseh - 40 * cursonglrc.length;
        ppxx = dellrc;
    }

    $("#lrc").css("transform", "translate(-50%," + dellrc + "px)");

    let currow = (baseh - dellrc - 60) < 0 ? 0 : Math.floor((baseh - dellrc - 60) / 40 + 1);//滑动时选中当前行

    for (let i = 0; i < cursonglrc.length; i++) {

        if (i != currentLine) {//改变颜色
            $("#slilrc" + i).removeClass("lion");
            $("#slilrc" + i).addClass("lioff");

            $("#slrc" + i).removeClass("on");
            $("#slrc" + i).addClass("off");

            $("#slrc" + i).css("color", "black");
        } else {
            $("#slilrc" + i).removeClass("lioff");
            $("#slilrc" + i).addClass("lion");

            $("#slrc" + i).removeClass("off");
            $("#slrc" + i).addClass("on");

            $("#slrc" + i).css("color", "red");
        }

        if (i != currentLine) {//改变透明度
            $("#slrc" + i).css("opacity", 1.2 - Math.abs(i - currow) * 0.2);
        } else {
            $("#slrc" + i).css("opacity", 1);
        }

        if (document.getElementById("RtxSwitch").innerHTML == "RtxOn") {

            let color = rainBow((synchroTime + i * 10) % 50 / 50);
            let r = color.red;
            let g = color.green;
            let b = color.blue;
            $("#slrc" + i).css("color", "rgb(" + r + "," + g + "," + b + ")");

        }
    }

    if (document.getElementById("slrc" + currentLine)) {//白色遮挡
        let patpos = document.getElementById("slrc" + currentLine).getBoundingClientRect();

        $("#whiteblk").css("width", patpos.width + "px");
        $("#whiteblk").css("top", patpos.y - document.getElementById("lrcbg").getBoundingClientRect().y + "px");

        $("#whitelrc").css("innerHTML", patpos.width + "px");
        $("#whitelrc").html($("#slrc" + currentLine).html());
        $("#whitelrc").css("width", perc * patpos.width + "px");
        $("#whitelrc").css("opacity", $("#slrc" + currentLine).css("opacity"));

        if (document.getElementById("RtxSwitch").innerHTML == "RtxOn") {

            let color = rainBow((synchroTime + currentLine * 10) % 50 / 50);
            let r = color.red;
            let g = color.green;
            let b = color.blue;
            let antiColor = anticolor(r, g, b);
            $("#whitelrc").css("color", "rgb(" + antiColor.red + "," + antiColor.green + "," + antiColor.blue + ")");

        } else {
            $("#whitelrc").css("color", "white");
        }
    }
    // document.getElementById("show").innerHTML = dellrc+" "+baseh +" "+ currow;///////////////////////////////////////////

} 