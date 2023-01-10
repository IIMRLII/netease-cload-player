var starTime = 0;
var star = new Array();

function starT(x, y, rad, rotate, vrotate, vx, vy, r, g, b) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.rotate = rotate;
    this.vrotate = vrotate;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.tail = new Array();
    this.tailMount = 20 + Math.floor(Math.random() * 20);
}

function starTail(x, y) {
    this.x = x;
    this.y = y;
}

function starCounter() {
    let cir = 1;
    if (document.getElementById("RtxSwitch").innerHTML == "RtxOn") cir = 3;

    for (let c = 0; c < cir; c++) {

        starTime++;

        if (starTime % Math.floor(100 / cir) == 0) {
            if (Math.random() <= 0.5) {
                star.push(new starT(Math.random() * window.innerWidth, 0, 3 + Math.random() * 5, Math.random() * 360, Math.random() * 10 - 5, -3 - Math.random() * 5, 1 + Math.random() * 2, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)));
            } else {
                star.push(new starT(window.innerWidth, Math.random() * window.innerHeight, 3 + Math.random() * 5, Math.random() * 360, Math.random() * 10 - 5, -3 - Math.random() * 5, 1 + Math.random() * 2, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)));
            }
        }

        for (let i = star.length - 1; i >= 0; i--) {//星星滑动
            let s = star[i];
            s.x = s.x + s.vx;
            s.y = s.y + s.vy;
            s.rotate = s.rotate + s.vrotate;
            s.tail.push(new starTail(s.x, s.y));
            if (s.tail.length > s.tailMount) { s.tail.splice(0, 1) }
            if (s.x < -300 || s.y > window.innerHeight + 300) {
                star.splice(i, 1);
            }
        }
    }
}

function starPainter() {
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");

    for (let i = star.length - 1; i >= 0; i--) {
        let s = star[i];

        let tempPos;
        for (let j = 0; j < s.tail.length; j++) {//画星星拖尾
            let pos = { x: s.tail[j].x, y: s.tail[j].y }

            if (j == 0) { tempPos = pos; continue; }

            ctx.beginPath();
            ctx.lineWidth = (j / s.tail.length) * s.rad * 2;
            ctx.strokeStyle = "RGBA(" + (s.r + 50) + "," + (s.g + 50) + "," + (s.b + 50) + "," + j / s.tail.length + ")";
            ctx.moveTo(tempPos.x, tempPos.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();

            tempPos = pos;
        }

        ctx.translate(s.x, s.y);

        ctx.beginPath();
        
        const horn = 5;//五角星
        const angle = 360 / horn;
        const rotate = 0;
        // for (let i = 0; i < horn; i++) {
        //     ctx.lineTo(100 * Math.cos(18 + i * angle - rotate), -100 * Math.sin(18 + i * angle - rotate));
        //     ctx.lineTo(50 * Math.cos(54 + i * angle - rotate), -50 * Math.sin(54 + i * angle - rotate));
        // }
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * angle - s.rotate) / 180 * Math.PI) * s.rad * 1.618, -Math.sin((18 + i * angle - s.rotate) / 180 * Math.PI) * s.rad * 1.618);
            ctx.lineTo(Math.cos((54 + i * angle - s.rotate) / 180 * Math.PI) * s.rad, -Math.sin((54 + i * angle - s.rotate) / 180 * Math.PI) * s.rad);
        }
        ctx.closePath();

        ctx.fillStyle = "RGB(" + s.r + "," + s.g + "," + s.b + ")";
        ctx.fill();

        // ctx.strokeStyle = "RGB(" + s.r + "," + s.g + "," + s.b + ")";
        // ctx.lineWidth = "5";
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.fillStyle = "RGB(" + s.r + "," + s.g + "," + s.b + ")";
        // ctx.arc(0, 0, s.rad, 0, Math.PI * 2);
        // ctx.fill();

        ctx.translate(-s.x, -s.y);
    }
}