var loopNotes = ['C4', 'G4', 'D5'];
var singleNotes = ['E4', 'A4', 'C5'];
var loops = [];
var loopSynths = [];
var singleSynths = [];
var fps = 60;
var stars = [];

for (var i = 0; i < 3; i++) {
    var loopSynth = new Tone.Synth({ 'envelope': { 'release': 2 }}).toMaster();
    loopSynths.push(loopSynth);

    var singleSynth = new Tone.Synth({ 'envelope': { 'release': 2 }}).toMaster();
    singleSynths.push(singleSynth);

    loops.push(new Tone.Loop(play.bind(null, i, true), 1));
}

Tone.Transport.start();

function play(number, loop) {
    if (loop)
        loopSynths[number].triggerAttackRelease(loopNotes[number], 0.2);
    else
        singleSynths[number].triggerAttackRelease(singleNotes[number], 0.2);
}

function repeatPlay(number) {
    if (loops[number].state == 'started') {
        loops[number].stop();
        return false;
    }
    else {
        loops[number].start();
        return true;
    }
}

var canvas;
var ctx;
var width;
var height;
var devicePixelRatio;
var backingStoreRatio;
var ratio;

var shapes = {};

function init() {
    canvas = document.getElementById("cnvs")
    ctx = canvas.getContext("2d");

    // finally query the various pixel ratios
    devicePixelRatio = window.devicePixelRatio || 1,
    backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1,

    ratio = devicePixelRatio / backingStoreRatio;

    resize();

    var shadowWidth = 30;

    //Top-center triangle
    shapes['top'] = new Polygon([
        new Vector(0, 0),
        new Vector(300, 200),
        new Vector(600, 0)
    ], {
        position: new Vector(width/2, 0),
        origin: new Vector(300, 0),
        color: '#00ADB5'
    });
    var d = 0.588002603548;
    var shadow1X = shadowWidth * Math.cos(d);
    var shadow1Y = shadowWidth * Math.sin(d);
    // shapes['top'].addShadow([
    //     new Vector(300 - shadow1X, 200 - shadow1Y),
    //     new Vector(300, 200),
    //     new Vector(600, 0),
    //     new Vector(600 - shadow1X, -shadow1Y)
    // ], '#222831');

    //Left corner
    shapes['left'] = new Polygon([
        new Vector(0, 0),
        new Vector(300, 200),
        new Vector(300, 350),
        new Vector(0, 350)
    ], {
        position: new Vector(0, height),
        origin: new Vector(0, 350),
        color: '#222831'
    });

    //Right corner
    shapes['right'] = new Polygon([
        new Vector(300, 0),
        new Vector(0, 200),
        new Vector(0, 350),
        new Vector(300, 350)
    ], {
        position: new Vector(width, height),
        origin: new Vector(300, 350),
        color: '#222831'
    });

    $(canvas).on('click', function(e) {
        var hitPos = new Vector(e.pageX, e.pageY);

        if (shapes['top'].hitTest(hitPos))
            repeatPlay(0);
        else if (shapes['left'].hitTest(hitPos))
            repeatPlay(1);
        else if (shapes['right'].hitTest(hitPos))
            repeatPlay(2);
    });

    setInterval(draw, 1000 / fps);
}

function draw() {
    drawStars();
    drawText();

    shapes['top'].drawOnscreen(ctx);
    shapes['left'].drawOnscreen(ctx);
    shapes['right'].drawOnscreen(ctx);
}

//Re-size
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height; 

    // upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        // now scale the context to counter
        // the fact that we've manually scaled
        // our canvas element
        ctx.scale(ratio, ratio);

    }

    generateStars();

    if (shapes['top']) {
        shapes['top'].move(new Vector(width/2, 0));
    }

    if (shapes['left']) {
        shapes['left'].move(new Vector(0, height));
    }

    if (shapes['right']) {
        shapes['right'].move(new Vector(width, height));
    }
}

function generateStars() {
    stars = [];

    for(var n = 0; n < 100; n++){
        var x=parseInt(Math.random()*width);
        var y=parseInt(Math.random()*height);
        var radius=Math.random()*1.5;

        stars.push({ x, y, radius });
    }
}

function drawStars() {
    ctx.beginPath();
    ctx.fillStyle="white";

    for (var n = 0; n < 100; n++) {
        var star = stars[n]; 
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2, false);
        ctx.closePath();
    }

    ctx.fill();
}

function drawText() {
    ctx.font = "100 132px Raleway, sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("HORIZONS", width/2, height/2)
}