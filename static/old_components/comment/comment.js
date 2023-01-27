var totalSongComments = new Array();
var curSongComments = new Array();

var commentTime = 50 + 50 * Math.sin(Math.random() * 2 * Math.PI);
var curComment = 0;

var comments = function (x,y,vx,vy,img,nickname,comment,time,id) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.img = img;
    this.nickname = nickname;
    this.comment = comment;
    this.time = time;
    this.id = id;
    this.use = false;
    this.ismove = true;
    this.rainbowT = Math.random();
}

$(window).ready(function() {//移动端适配
    $('body').on('click', '#thecomments', function(e) {
        for(let i = 0; i < totalSongComments.length;i++){//监测该弹幕是否被使用
            totalSongComments[i].ismove = true;
            $('#com' + i + ' p').removeClass('thecomments_hover_p');
        }
    })
    $('#thecomments').on('click', "div", function(e){
        event.stopPropagation()
    });
})

function commentsCounter(){
    if(totalSongComments.length > 0){
        if(commentTime > 0){
            commentTime--;
        }else{
            for(let i = curComment;i < totalSongComments.length;i++){//监测该弹幕是否被使用
                let tc = totalSongComments[i];
                if(!tc.use){
                    tc.use = true;
                    curSongComments.push(tc);

                    document.getElementById("thecomments").innerHTML += "<div id='com" + i + "'><img src=" + tc.img + "></img><p>" + tc.comment + "</p></div>";
                    
                    // search.$options.methods.addmouselistener("#com" + i);
                    // document.getElementById("com" + i).addEventListener("mouseover", function(){
                    //     tc.ismove = false;
                    // });
                    // document.getElementById("com" + i).addEventListener("mouseout", function(){
                    //     tc.ismove = true;
                    // });

                    $('#thecomments').on('mouseover', "#com" + i, function(){
                        tc.ismove = false;
                        $('#com' + i + ' p').addClass('thecomments_hover_p');
                    });
                    $('#thecomments').on('mouseout', "#com" + i, function(){
                        tc.ismove = true;
                        $('#com' + i + ' p').removeClass('thecomments_hover_p');
                        // $('#com' + i + ' p').css('font-size', '20px');
                    });
                    
                    let x = window.innerWidth;
                    let y = 115 + Math.random() * (window.innerHeight - 115 - 90);
                    let vx = -2 - Math.random() * 3;
                    let vy = 0;
                    tc.x = x;
                    tc.y = y;
                    tc.vx = vx;
                    tc.vy = vy;

                    commentTime = 50 + 50 * Math.sin(Math.random() * 2 * Math.PI);//弹幕频率
                    if(i == curComment){
                        if(curComment + 1 < totalSongComments.length){
                            curComment++;
                        }else{
                            curComment = 0;
                        }
                    }
                    break;
                }
                if(i == totalSongComments.length - 1)curComment = 0;
            }
        }
    }

    for(let i = curSongComments.length - 1;i >= 0;i--){
        let cur = curSongComments[i];

        if(cur.ismove){
            cur.x += cur.vx;
            cur.y += cur.vy;

            $("#com" + cur.id).css("left", cur.x);
            $("#com" + cur.id).css("top", cur.y);

            
            if(document.getElementById("RtxSwitch").innerHTML == "RtxOn"){

                let firstRainbowTime = cur.rainbowT + synchroTime % 300 / 300;
                let firstColor = rainBow(firstRainbowTime > 1?firstRainbowTime - 1:firstRainbowTime);
                let colorString = "linear-gradient(to right,rgb(" + firstColor.red + "," + firstColor.green + "," + firstColor.blue + ") 20%";
                for(let j = 1;j <= 10;j++){
                    let rainbowTime = cur.rainbowT + synchroTime % 300 / 300 + j / 10;
                    let color = rainBow(rainbowTime > 2?rainbowTime - 2:rainbowTime > 1?rainbowTime - 1:rainbowTime);
                    colorString += ",rgba(" + color.red + "," + color.green + "," + color.blue + "," + (10 - j) / 10 + ")" + " " + (20 + j / 10 * 80) +"%";
                }
                colorString += ")";
                $("#com" + cur.id).css("background",colorString);

            }else{
                $("#com" + cur.id).css("background","linear-gradient(to right,rgb(135, 180, 222) 20%,rgb(135, 180, 222) 50%,rgba(255,255,255,0) 100%)");
            }

            if(cur.x < -$("#com" + cur.id).width() || cur.x > window.innerWidth || cur.y < 0 || cur.y > window.innerHeight){//评论超出屏幕
                let parent = document.getElementById("thecomments");
                let child = document.getElementById("com" + cur.id);
                parent.removeChild(child);

                totalSongComments[cur.id].use = false;
                    
                curSongComments.splice(i,1);
            }
        }
    }
}

// alert(search.$options.data().volume);

