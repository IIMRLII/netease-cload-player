//贝塞尔曲线公式
function bezier(theArray, t) {
    var x = 0,
        y = 0;
    //控制点数组
    n = theArray.length - 1;
    self = this;
    theArray.forEach(function(item, index) {
        if (!index) {
            x += item.x * Math.pow((1 - t), n - index) * Math.pow(t, index);
            y += item.y * Math.pow((1 - t), n - index) * Math.pow(t, index);
        } else {
            //factorial为阶乘函数
            x += factorial(n) / factorial(index) / factorial(n - index) * item.x * Math.pow((1 - t), n - index) * Math.pow(t, index);
            y += factorial(n) / factorial(index) / factorial(n - index) * item.y * Math.pow((1 - t), n - index) * Math.pow(t, index);
        }
    })
    return {
        x: x,
        y: y
    }
}

function factorial(num) {
    if (num < 0) {
        return -1;
    } else if (num == 0 || num == 1) {
        return 1;
    } else {
        return (num * factorial(num - 1));
    }
}

function rainBow(t) {
    var red = 0;
    var green = 0;
    var blue = 0;
    if (t < 0.334) {
        red = 255 - t * 3 * 255;
        green = t * 3 * 255;
        blue = 0;
    } else if (t < 0.667) {
        red = 0;
        green = 255 - (t - 0.334) * 3 * 255;
        blue = (t - 0.334) * 3 * 255;
    } else {
        red = (t - 0.667) * 3 * 255;
        green = 0;
        blue = 255 - (t - 0.667) * 3 * 255;
    }
    return {
        red: red,
        green: green,
        blue: blue
    }
}

function anticolor(r, g, b) {
    var red = 255 - r;
    var green = 255 - g;
    var blue = 255 - b;
    return {
        red: red,
        green: green,
        blue: blue
    }
}