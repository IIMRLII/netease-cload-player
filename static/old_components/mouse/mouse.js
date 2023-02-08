var mouseX = 0;
var mouseY = 0;
var rotateTime = 0;
var earthrotatespeed = 0;
var mouseArray = new Array();
var mouseParticle = new Array();

function mouseT(x, y) {
    this.x = x;
    this.y = y;
}

function mouseTailCounter() {
    mouseArray.push(new mouseT(mouseX, mouseY));
    if (mouseArray.length > 15) { mouseArray.splice(0, 1) }
}

function mouseTailPainter() {

    let cir = 1;
    if (document.getElementById("RtxSwitch").innerHTML == "RtxOn") {
        rotateTime += 5;
    } else {
        rotateTime++;
    }

    var c = document.getElementById("canvas1");

    var ctx = c.getContext("2d");

    var color = rainBow(rotateTime % 300 / 300);
    ctx.strokeStyle = "RGBA(" + color.red + "," + color.green + "," + color.blue + ")";
    ctx.fillStyle = "RGBA(" + color.red + "," + color.green + "," + color.blue + ")";

    let tempPos;
    for (let i = 0; i < mouseArray.length; i++) { //画鼠标拖尾
        let pos = bezier(mouseArray, i / mouseArray.length);

        if (i == 0) { tempPos = pos; continue; }

        ctx.beginPath();
        ctx.lineWidth = (i / mouseArray.length) * 12;
        // ctx.strokeStyle = "RGBA(" + color.red + "," + color.green + "," + color.blue + "," + i / mouseArray.length + ")";
        ctx.moveTo(tempPos.x, tempPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        // console.log(pos.x + " " + pos.y + " " + tempPos.x + " " + tempPos.y)

        ctx.beginPath();//补全圆形
        // ctx.fillStyle = "RGBA(" + color.red + "," + color.green + "," + color.blue + "," + i/mouseArray.length + ")";
        ctx.arc(tempPos.x, tempPos.y, (i / mouseArray.length) * 12 / 2, 0, Math.PI * 2);
        ctx.fill();

        tempPos = pos;
    }

    if (mouseArray.length > 0) { //画鼠标方块
        let pos = {
            x: mouseArray[mouseArray.length - 1].x,
            y: mouseArray[mouseArray.length - 1].y
        }

        ctx.translate(pos.x, pos.y);
        ctx.rotate(rotateTime * 0.02 * Math.PI);

        ctx.fillStyle = "RGB(" + color.red + "," + color.green + "," + color.blue + ")";
        ctx.fillRect(-6, -6, 12, 12);

        let antiColor = anticolor(color.red, color.green, color.blue);
        ctx.fillStyle = "RGB(" + antiColor.red + "," + antiColor.green + "," + antiColor.blue + ")";
        ctx.fillRect(-5, -5, 10, 10);

        ctx.fillStyle = "black";
        ctx.fillRect(-3, -3, 6, 6);

        ctx.rotate(-rotateTime * 0.02 * Math.PI);
        ctx.translate(-pos.x, -pos.y);
    }

    if (document.getElementById("RtxSwitch").innerHTML == "RtxOn") {

        if (Math.random() < 0.3) { //生成鼠标粒子
            let rad = Math.random() * 2 * Math.PI;
            let vx = 5 * (Math.random() - 0.5) * Math.cos(rad);
            let vy = 5 * (Math.random() - 0.5) * Math.sin(rad);
            let time = 80 + 20 * Math.random();
            mouseParticle.push(new partical(mouseX, mouseY, time, vx, vy, 0, 0, 10, 0, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255, 255, 255, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3))
        }

    }
}

$(window).mousemove(function (e) {
    mouseX = e.clientX; // 鼠标落下时的X
    mouseY = e.clientY; // 鼠标落下时的Y
})

$(window).click(function (e) {
    let lzsum = 10 + Math.floor(Math.random() * 5);

    if (document.getElementById("RtxSwitch").innerHTML == "RtxOn") lzsum += 20;

    for (let i = 0; i < lzsum; i++) {
        let rad = Math.random() * 2 * Math.PI;
        let vx = 3 * (Math.random() - 0.5) * Math.cos(rad);
        let vy = 3 * (Math.random() - 0.5) * Math.sin(rad);
        let time = 80 + 20 * Math.random();
        mouseParticle.push(new partical(mouseX, mouseY, time, vx, vy, 0, 0, 10, 0, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255, 255, 255, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3, Math.random() * 4 * Math.PI * 3 - 2 * Math.PI * 3))
    }
})