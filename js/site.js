var loopNotes = ['C4', 'G4', 'D5'];
var singleNotes = ['E4', 'A4', 'C5'];
var loops = [];
var loopSynths = [];
var singleSynths = [];
var fps = 60;
var stars = [];

for (var i = 0; i < 3; i++) {
    var loopSynth = new Tone.Synth({ 'envelope': { 'release': 2 } }).toMaster();
    loopSynths.push(loopSynth);

    var singleSynth = new Tone.Synth({ 'envelope': { 'release': 2 } }).toMaster();
    singleSynths.push(singleSynth);

    loops.push(new Tone.Loop(play.bind(null, i, true), 1.5));
}

Tone.Transport.start();

function play(number, loop) {
    if (loop) {
        loopSynths[number].triggerAttackRelease(loopNotes[number], 0.2);
        drawBars(number);
    }
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
var bars = [[], [], []];

var shapes = {};

function init() {
    canvas = document.getElementById("cnvs")
    ctx = canvas.getContext("2d");

    resize();

    //Top-center triangle
    shapes['top'] = new Polygon([
        new Vector(0, 0),
        new Vector(300, 200),
        new Vector(600, 0)
    ], {
            position: new Vector(width / 2, 0),
            origin: new Vector(300, 0),
            color: '#00ADB5'
        });

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

    $(canvas).on('click', function (e) {
        var hitPos = new Vector(e.pageX, e.pageY);

        if (shapes['top'].hitTest(hitPos)) {
            repeatPlay(0);
        }
        else if (shapes['left'].hitTest(hitPos))
            repeatPlay(1);
        else if (shapes['right'].hitTest(hitPos))
            repeatPlay(2);
    });

    setInterval(draw, 1000 / fps);
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    TWEEN.update();

    drawStars();

    shapes['top'].drawOnscreen(ctx);
    shapes['left'].drawOnscreen(ctx);
    shapes['right'].drawOnscreen(ctx);

    for (var bar of [].concat.apply([], bars)) {
        bar.draw(ctx);
    }
}

//Re-size
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    generateStars();

    if (shapes['top']) {
        shapes['top'].move(new Vector(width / 2, 0));
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

    for (var n = 0; n < 100; n++) {
        var x = parseInt(Math.random() * width);
        var y = parseInt(Math.random() * height);
        var radius = Math.random() * 1.5;

        stars.push({ x, y, radius });
    }
}

function drawStars() {
    ctx.beginPath();
    ctx.fillStyle = Color.white.toString();

    for (var n = 0; n < 100; n++) {
        var star = stars[n];
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.closePath();
    }

    ctx.fill();
}

function drawBars(number) {
    if (number == 0) {
        drawBarsForPoints(new Vector(width / 2 - 300, 0), new Vector(width / 2, 200), Color.fromHex("#00ADB5"), 0);
        drawBarsForPoints(new Vector(width / 2 + 300, 0), new Vector(width / 2, 200), Color.fromHex("#00ADB5"), 0);
    }
    else if (number == 1) {
        drawBarsForPoints(new Vector(300, width - 150), new Vector(0, height - 350), Color.fromHex("#222831"), 0);
        // drawBarsForPoints(new Vector(width / 2 + 300, 0), new Vector(width / 2, 200), Color.fromHex("#222831"), 0);
    }
    else if (number == 2) {
        // drawBarsForPoints(new Vector(width / 2 - 300, 0), new Vector(width / 2, 200), Color.fromHex("#222831"), 0);
        // drawBarsForPoints(new Vector(width / 2 + 300, 0), new Vector(width / 2, 200), Color.fromHex("#222831"), 0);
    }
}

function drawBarsForPoints(point1, point2, color, number) {
    var barWidth = Math.hypot(point2.x - point1.x, point2.y - point1.y) - 50;
    var position = Vector.average(point1, point2);


    var direction = new Vector(point2.x - point1.x, point2.y - point1.y);
    var adjustment = new Vector(1, 1);

    // if (direction.x)

    var normal = new Vector(-direction.y, direction.x);
    var distance = 500;
    var duration = 1000;
    var endColor = new Color(color.r, color.g, color.b, 0);

    function addBar(timeout) {
        var bar = new Bars({
            barWidth: barWidth,
            barThickness: 15,
            position: position,
            direction: normal,
            duration: 1000,
            distance: 750,
            startColor: color,
            endColor: endColor,
            onComplete: () => bars[number].splice(0)
        });

        bars[number].push(bar);
        console.log(bars[number].length);
        setTimeout(() => bar.start(), timeout);
    }

    addBar(0);
    addBar(50);
    addBar(130);
}