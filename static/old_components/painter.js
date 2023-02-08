var sizek = window.innerHeight / window.innerWidth;

function resizeCanvas() {//画布大小不能通过修改css实现
    $("#canvas1").attr("width", window.innerWidth);  
    $("#canvas1").attr("height", window.innerHeight);
    
    // $("#canvas2").attr("width", window.innerWidth);  
    // $("#canvas2").attr("height", window.innerHeight); 
}

function frontPainter(){//canvas1绘制鼠标
    var c=document.getElementById("canvas1");
    
    var ctx = c.getContext("2d");
    // ctx.clearRect(0,0,c.width,c.height);
    c.width  = c.width;//清空画布

    mouseTailPainter();//画鼠标拖尾
    mouseParticalPainter();//画鼠标粒子
    starPainter();//画星星
}

function backPainter(){//canvas2绘制背景
    var c=document.getElementById("canvas2");
    var ctx = c.getContext("2d");
    c.width  = c.width;//清空画布
    // ctx.clearRect(0,0,c.width,c.height);

    //画宇宙
    ctx.drawImage(darkspace,-50+Math.sin(rotateTime/500)*50,-50+Math.sin(rotateTime/500)*50*sizek,c.width+100-2*Math.sin(rotateTime/500)*50,c.height+100-2*Math.sin(rotateTime/500)*50*sizek);

    // starPainter();//画星星

    ctx.translate($(window).get(0).innerWidth/2,$(window).get(0).innerHeight+$(window).get(0).innerWidth/c.width*earth.height/6);
    
    // ctx.rotate(rotateTime*0.0001*Math.PI);
    // ctx.drawImage(space,-$(window).get(0).innerWidth,-$(window).get(0).innerWidth,$(window).get(0).innerWidth*2,$(window).get(0).innerWidth*2);
    // ctx.rotate(-rotateTime*0.0001*Math.PI);
    
    earthrotatespeed += document.getElementById("play").title == "play" ? 3 : 7.5;

    if(document.getElementById("RtxSwitch").innerHTML == "RtxOn"){
        earthrotatespeed += 15;
    }
    
    ctx.rotate(earthrotatespeed*0.0001*Math.PI);//画地球
    ctx.drawImage(earth,-$(window).get(0).innerWidth/2,-$(window).get(0).innerWidth/2,$(window).get(0).innerWidth,$(window).get(0).innerWidth);
    ctx.rotate(-earthrotatespeed*0.0001*Math.PI);

    ctx.translate(-$(window).get(0).innerWidth/2,-$(window).get(0).innerHeight-$(window).get(0).innerWidth/c.width*earth.height/6);

    //画评论弹幕

    // mouseTailPainter();//画鼠标拖尾
}

$(window).resize(resizeCanvas); //窗口大小调整
resizeCanvas();
