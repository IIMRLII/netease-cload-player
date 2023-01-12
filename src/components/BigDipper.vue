<template>
    <div v-if="!isAniFinish" class="big_dipper">
        <canvas id="star_canvas"></canvas>
        <div class="star star_1 star_dark"></div>
        <div class="star star_2 star_dark"></div>
        <div class="star star_3 star_dark"></div>
        <div class="star star_4 star_dark"></div>
        <div class="star star_5 star_dark"></div>
        <div class="star star_6 star_dark"></div>
        <div class="star star_7 star_dark"></div>
        <div class="moon">
            <div class="crater crater1"></div>
            <div class="crater crater2"></div>
            <div class="crater crater3"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BigDipper",
    data() {
        return {
            isAniFinish: false,
            littleStar: [],
            lines: [],
            stars: [
                { left: 14.0, top: 30.9 },
                { left: 31.3, top: 24.8 },
                { left: 41.4, top: 36.7 },
                { left: 54.2, top: 48.0 },
                { left: 56.8, top: 72.7 },
                { left: 77.9, top: 73.9 },
                { left: 81.1, top: 44.3 },
            ],
            starElements: [],
            starAniCount: 0,
        };
    },
    mounted() {
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        for (let i = 0; i < this.stars.length; i++) {
            if (i == 0) continue;
            let star = this.createLine(
                (vw * this.stars[i - 1].left) / 100,
                (vh * this.stars[i - 1].top) / 100,
                (vw * this.stars[i].left) / 100,
                (vh * this.stars[i].top) / 100
            );
            this.starElements.push(star)
            $('.big_dipper').append(star);
        }

        $(window).resize(this.resizeCanvas); //窗口大小调整
        this.resizeCanvas();

        $('.star_1').removeClass('star_dark')
        let starTimer = window.setInterval(() => {
            $(this.starElements[this.starAniCount]).css('animation', 'starLineGlitter 0.5s ease-in-out 1 alternate forwards')
            let aniTime = this.starAniCount + 2;
            window.setTimeout(() => {
                $('.star_' + aniTime).removeClass('star_dark')
            }, 500)
            this.starAniCount++;
            if(this.starAniCount === 6) {
                clearTimeout(starTimer)
                window.setTimeout(() => {//加载完毕一秒后转入页面
                    this.isAniFinish = true;
                }, 1000)
            }
        }, 500)
    },
    methods: {
        resizeCanvas() {
            //画布大小不能通过修改css实现
            $("#star_canvas").attr("width", window.innerWidth);
            $("#star_canvas").attr("height", window.innerHeight);
            this.paintCanvas();
            this.relocateLines();
        },
        paintCanvas() {
            function starT(x, y, rad, rotate, vrotate, r, g, b) {
                this.x = x;
                this.y = y;
                this.rad = rad;
                this.rotate = rotate;
                this.vrotate = vrotate;
                this.r = r;
                this.g = g;
                this.b = b;
            }

            this.littleStar = [];
            for (let i = 0; i <= 40; i++) {
                let rad = 4 - 2 * Math.random();
                let star = new starT(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    rad,
                    Math.random() * 360,
                    Math.random() * 10 - 5,
                    Math.floor(Math.random() * 256),
                    Math.floor(Math.random() * 256),
                    Math.floor(Math.random() * 256)
                );
                this.littleStar.push(star);
            }

            var c = document.getElementById("star_canvas");
            var ctx = c.getContext("2d");
            c.width = c.width;

            for (let i = this.littleStar.length - 1; i >= 0; i--) {
                let s = this.littleStar[i];
                ctx.translate(s.x, s.y);
                ctx.beginPath();

                const horn = 5; //五角星
                const angle = 360 / horn;
                const rotate = 0;
                // for (let i = 0; i < horn; i++) {
                //     ctx.lineTo(100 * Math.cos(18 + i * angle - rotate), -100 * Math.sin(18 + i * angle - rotate));
                //     ctx.lineTo(50 * Math.cos(54 + i * angle - rotate), -50 * Math.sin(54 + i * angle - rotate));
                // }
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(
                        Math.cos(
                            ((18 + i * angle - s.rotate) / 180) * Math.PI
                        ) *
                            s.rad *
                            1.618,
                        -Math.sin(
                            ((18 + i * angle - s.rotate) / 180) * Math.PI
                        ) *
                            s.rad *
                            1.618
                    );
                    ctx.lineTo(
                        Math.cos(
                            ((54 + i * angle - s.rotate) / 180) * Math.PI
                        ) * s.rad,
                        -Math.sin(
                            ((54 + i * angle - s.rotate) / 180) * Math.PI
                        ) * s.rad
                    );
                }
                ctx.closePath();

                // ctx.fillStyle = "RGB(" + s.r + "," + s.g + "," + s.b + ")";
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.translate(-s.x, -s.y);
            }
        },
        createLineElement(x, y, length, angle) {
            var line = document.createElement("div");
            var styles = {
                'border-width': '2px',
                'border-style': 'solid',
                'opacity': '0',
                'width': `${length}px`,
                'height': '0px',
                'transform': `rotate(${angle}rad)`,
                'position': 'absolute',
                'top': `${y}px`,
                'left': `${x}px`,
            }
            $(line).css(styles)
            return line;
        },
        createLine(x1, y1, x2, y2) {
            //位置修正（因为边框变宽）
            x1 = x1 - 1;
            y1 = y1 - 1;
            x2 = x2 - 1;
            y2 = y2 - 1;
            var a = x1 - x2,
                b = y1 - y2,
                c = Math.sqrt(a * a + b * b);

            var sx = (x1 + x2) / 2,
                sy = (y1 + y2) / 2;

            var x = sx - c / 2,
                y = sy;

            var alpha = Math.PI - Math.atan2(-b, a);

            return this.createLineElement(x, y, c, alpha);
        },
        relocateLineElement(line, x, y, length, angle) {
            var styles = {
                'border-width': '2px',
                'border-style': 'solid',
                // 'opacity': '0',
                'width': `${length}px`,
                'height': '0px',
                'transform': `rotate(${angle}rad)`,
                'position': 'absolute',
                'top': `${y}px`,
                'left': `${x}px`,
            }
            $(line).css(styles)
            return line;
        },
        relocateLines() {
            let vw = window.innerWidth;
            let vh = window.innerHeight;
            for(let i = 0; i < this.stars.length; i++) {
                if (i == 0) continue;
                let star = this.starElements[i - 1];
                this.relocateLine(
                    star,
                    (vw * this.stars[i - 1].left) / 100,
                    (vh * this.stars[i - 1].top) / 100,
                    (vw * this.stars[i].left) / 100,
                    (vh * this.stars[i].top) / 100
                );
            }
        },
        relocateLine(line, x1, y1, x2, y2) {
            //位置修正（因为边框变宽）
            x1 = x1 - 1;
            y1 = y1 - 1;
            x2 = x2 - 1;
            y2 = y2 - 1;
            var a = x1 - x2,
                b = y1 - y2,
                c = Math.sqrt(a * a + b * b);

            var sx = (x1 + x2) / 2,
                sy = (y1 + y2) / 2;

            var x = sx - c / 2,
                y = sy;

            var alpha = Math.PI - Math.atan2(-b, a);

            return this.relocateLineElement(line, x, y, c, alpha);
        },
    },
};
</script>

<style>
.little_star {
    background-color: #919191;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: fixed;
    z-index: 10000;
    animation: star 3s ease-in-out infinite alternate;
}

@keyframes star {
    from {
        transform: translate(-50%, -50%) scale(0.9);
    }
    to {
        transform: translate(-50%, -50%) scale(1.1);
    }
}

@keyframes starLineGlitter {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
<style lang="scss" scoped>
.big_dipper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    // background-color: white;
    // background-image: url('~@/assets/BigDipper.jfif');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    z-index: 9999;
    background-color: #07031d;
    background-image: linear-gradient(
        43deg,
        #07031d,
        #120a31,
        #110840,
        #0c0448,
        #0c0342
    );
}

#star_canvas {
    z-index: 10000;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    position: fixed;
    display: block;
    pointer-events: none;
}

.moon {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ddd;
    box-shadow: inset 10px -10px #b9b9b9, 0px 0px 40px 20px #203a87;
    z-index: 10001;
}

.crater {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #bbb;
}

.crater1 {
    top: 45px;
    right: 45px;
    box-shadow: inset -1px 2px 0 0 #969696;
}

.crater2 {
    width: 30px;
    height: 30px;
    top: 22.5px;
    right: 15px;
    box-shadow: inset -2px 4px 0 0 #aaa;
}

.crater3 {
    width: 7.5px;
    height: 7.5px;
    top: 15px;
    right: 45px;
}

.star {
    z-index: 10001;
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    // opacity: 0.2;
    box-sizing: border-box;
    box-shadow: 0 0 10px 5px #ccc;
    animation: star 3s ease-in-out infinite alternate;
    transition: background-color 0.5s ease;
}

.star_dark {
    background-color: rgb(88, 88, 88);
}

.star_1 {
    left: 14%;
    top: 30.9%;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 10px 5px #263a8a;
}

.star_2 {
    left: 31.3%;
    top: 24.8%;
    width: 18px;
    height: 18px;
    box-shadow: 0 0 10px 5px #293b84;
}

.star_3 {
    left: 41.4%;
    top: 36.7%;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 10px 5px #2c4385;
}

.star_4 {
    left: 54.2%;
    top: 48%;
    width: 13px;
    height: 13px;
    box-shadow: 0 0 10px 5px #37436e;
}

.star_5 {
    left: 56.8%;
    top: 72.7%;
    width: 18px;
    height: 18px;
    box-shadow: 0 0 10px 5px #37436e;
}

.star_6 {
    left: 77.9%;
    top: 73.9%;
    width: 19px;
    height: 19px;
    box-shadow: 0 0 10px 5px #364f85;
}

.star_7 {
    left: 81.1%;
    top: 44.3%;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 10px 5px #c59b72;
}
</style>
