function partical(x,y,time,vx,vy,fvx,fvy,size,fsize,r,g,b,fr,fg,fb,ang,fang){
    this.x = x;
    this.y = y;
    this.time = time;
    this.Ttime = time;
    this.vx = vx;
    this.vy = vy;
    this.fvx = fvx;
    this.fvy = fvy;
    this.ax = (fvx-vx)/time;
    this.ay = (fvy-vy)/time;
    this.size = size;
    this.fsize = fsize;
    this.asize = (fsize-size)/time;
    this.r = r;
    this.g = g;
    this.b = b;
    this.fr = fr;
    this.fg = fg;
    this.fb = fb;
    this.ar = (fr-r)/time;
    this.ag = (fg-g)/time;
    this.ab = (fb-b)/time;
    this.ang = ang;
    this.fang = fang;
    this.aang = (fang - ang)/time;
}

function mouseParticalTimer(){
    if(mouseParticle.length == 0)return ;
    mouseParticalPainter();
    for(let i = mouseParticle.length - 1;i >= 0;i--){
        let p = mouseParticle[i];
        p.x = p.x + p.vx;
        p.y = p.y + p.vy;
        p.vx = p.vx + p.ax;
        p.vy = p.vy + p.ay;
        p.size = p.size + p.asize;
        p.r = p.r + p.ar;
        p.g = p.g + p.ag;
        p.b = p.b + p.ab;
        p.ang = p.ang + p.aang;
        p.time--;
        if(p.time <= 0)mouseParticle.splice(i,1);
    }
}

function mouseParticalPainter(){
    var c=document.getElementById("canvas1");
    var ctx = c.getContext("2d");

    for(let i = mouseParticle.length - 1;i >= 0;i--){
        let p = mouseParticle[i];
        ctx.translate(p.x,p.y);
        ctx.rotate(p.ang);
        ctx.fillStyle = "RGB(" + p.r + "," + p.g + "," + p.b + ")";
        ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
        ctx.rotate(-p.ang);
        ctx.translate(-p.x,-p.y);
    }
}