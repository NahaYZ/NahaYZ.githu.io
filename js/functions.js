// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();


var sigleWordWidth;
var nextX,nextY;
var k_X,k_Y


$(function () {

    console.log("width:"+clientWidth);
    console.log("height:"+clientHeight);
    //单字宽度
    sigleWordWidth = (clientWidth - 40*2 - 30*2)/3
    console.log("singleHeight:"+sigleWordWidth);

    //K坐标
    k_X = sigleWordWidth + 30 + 40;
    k_Y = 0 + 20;


    // setup garden
    $loveHeart = $("#loveHeart");
    var offsetX = $loveHeart.width() / 2;
    var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    // $("#content").css("width", $loveHeart.width() + $("#code").width());
    // $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
    // $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
    // $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    //重载窗口重绘动画
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});


function getHeartPoint() {

    var t = angle / Math.PI;

    var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
    var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return new Array(offsetX + x, offsetY + y);
}

//获取每一步的花心
function getHeartPoint(angle) {
    var t = angle / Math.PI;

    // var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
    // var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    // return new Array(offsetX + x, offsetY + y);


    nextX = offsetX + 10*angle;
    nextY = offsetY;


    return new Array(40+ sigleWordWidth/2 + 5*angle, 20 + sigleWordWidth/2 - 5*angle );
}


function getHeartPoint2(angle) {
    offsetX = nextX- 10*angle;
    offsetY = nextY+ 10*angle;
    return new Array(sigleWordWidth+40 - 10*angle,20);
}

function getHeartPoint3(angle) {

    return new Array(40+ sigleWordWidth/2 - 5*angle, 20 + sigleWordWidth/2 + 5*angle);
}

function getHeartPoint4(angle) {

    return new Array(40 + 10*angle, 20+sigleWordWidth);
}

function getHeartPointK(angle) {

    return new Array(k_X, k_Y + 10*angle -10);
}

function getHeartPointK2(angle) {

    return new Array(k_X+10*angle, 20+sigleWordWidth/2 + 5*angle);
}

function getHeartPointK3(angle) {

    return new Array(k_X+10*angle, 20+sigleWordWidth/2 - 5*angle);
}


function getHeartPointY(angle) {

    return new Array(2.5*sigleWordWidth+80+10 - 5*angle, 20+sigleWordWidth/2 - 5*angle);
}

function getHeartPointY2(angle) {

    return new Array(2.5*sigleWordWidth+80+10 + 5*angle, 20+sigleWordWidth/2 - 5*angle);
}

function getHeartPointY3(angle) {

    return new Array(2.5*sigleWordWidth+80+10 , 20+sigleWordWidth/2 + 5*angle);
}

function startHeartAnimation() {
    const interval = 50;
    // var angle = 10;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPoint(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            let distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        //停止条件
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
            showMessages();
            startHeartAnimation2();
        } else {
            angle += 0.6;
        }
    }, interval);
}


function startHeartAnimation() {
    const interval = 50;
    // var angle = 10;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPoint(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            let distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        //停止条件
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
            showMessages();
            startHeartAnimation2();
        } else {
            angle += 0.6;
        }
    }, interval);
}

function startHeartAnimation2() {
    const interval = 50;
    // var angle = 10;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPoint2(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
        } else {
            angle += 0.6;
        }
    }, interval);
}


function startHeartAnimation3() {
    const interval = 50;
    // var angle = 10;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPoint3(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        //停止条件 (原条件 angle >= 30)
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
           startHeartAnimation4();
            setTimeout("javascript:location.href='love.html'", 7000);
        } else {
            angle += 0.6;
        }
    }, interval);
}

function startHeartAnimation4() {
    const interval = 50;
    // var angle = 10;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPoint4(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        //停止条件 (原条件 angle >= 30)
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
            showMessages();

        } else {
            angle += 0.6;
        }
    }, interval);
}



//画k
function startHeartAnimationK() {
    const interval = 50;
    // var angle = 10;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPointK(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        //停止条件
        if (10*angle >= sigleWordWidth +10) {
            clearInterval(animationTimer);
        } else {
            angle += 0.3;
        }
    }, interval);
}

function startHeartAnimationK2() {
    const interval = 50;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPointK2(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
        } else {
            angle += 0.3;
        }
    }, interval);
}

function startHeartAnimationK3() {
    const interval = 50;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPointK3(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (11*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
        } else {
            angle += 0.3;
        }
    }, interval);
}

//画Y
function startHeartAnimationY() {
    const interval = 50;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPointY(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
        } else {
            angle += 0.3;
        }
    }, interval);
}

function startHeartAnimationY2() {
    const interval = 50;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPointY2(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (10*angle >= sigleWordWidth) {
            clearInterval(animationTimer);
        } else {
            angle += 0.3;
        }
    }, interval);
}

function startHeartAnimationY3() {
    const interval = 50;
    let angle = 1;
    const heart = new Array();
    const animationTimer = setInterval(function () {
        const bloom = getHeartPointY3(angle);
        let draw = true;
        for (let i = 0; i < heart.length; i++) {
            const p = heart[i];
            const distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (10*angle >= sigleWordWidth+10) {
            clearInterval(animationTimer);

        } else {
            angle += 0.3;
        }
    }, interval);
}




(function($) {
    $.fn.typewriter = function() {
        this.each(function() {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

function timeElapse(date){
    var current = Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
    $("#elapseClock").html(result);
}

function showMessages() {
    adjustWordsPosition();
    $('#messages').fadeIn(5000, function() {
        showLoveU();
    });
}

function adjustWordsPosition() {
    $('#words').css("position", "absolute");
    $('#words').css("top", $("#garden").position().top + 195);
    $('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
    $('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
    $('#loveu').fadeIn(3000);
}