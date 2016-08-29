var loopNotes = ['C4', 'G4', 'D5'];
var singleNotes = ['E4', 'A4', 'C5'];
var loops = [];
var loopSynths = [];
var singleSynths = [];

for (var i = 0; i < 3; i++) {
    var loopSynth = new Tone.Synth({ 'envelope': { 'release': 2 }}).toMaster();
    loopSynths.push(loopSynth);

    var singleSynth = new Tone.Synth({ 'envelope': { 'release': 2 }}).toMaster();
    singleSynths.push(singleSynth);

    loops.push(new Tone.Loop(play.bind(null, i, true), 1));
}

Tone.Transport.start();

function play(number, loop) {
    console.log(number, loop);

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

var shapes = {};

function init() {
    canvas = document.getElementById("cnvs")
    ctx = canvas.getContext("2d");

    resize();

    drawStars();

    //Top-center triangle
    shapes['top'] = new Polygon([
        new Vector(0, 0),
        new Vector(300, 200),
        new Vector(600, 0)
    ], {
        position: new Vector(width/2, 0),
        origin: new Vector(300, 0),
        color: '#D65F5F'
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
        color: '#FAF99F'
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
        color: '#A1F6B6'
    });

    shapes['top'].drawOnscreen(ctx);
    shapes['left'].drawOnscreen(ctx);
    shapes['right'].drawOnscreen(ctx);

    $(canvas).on('click', function(e) {
        var hitPos = new Vector(e.pageX, e.pageY);

        if (shapes['top'].hitTest(hitPos))
            play(0);
        else if (shapes['left'].hitTest(hitPos))
            play(1);
        else if (shapes['right'].hitTest(hitPos))
            play(2);
    });
}

//Re-size
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height; 

    drawStars();

    if (shapes['top']) {
        shapes['top'].move(new Vector(width/2, 0));
        shapes['top'].drawOnscreen(ctx);
    }

    if (shapes['left']) {
        shapes['left'].move(new Vector(0, height));
        shapes['left'].drawOnscreen(ctx);
    }

    if (shapes['right']) {
        shapes['right'].move(new Vector(width, height));
        shapes['right'].drawOnscreen(ctx);
    }
}

function drawStars() {
    ctx.beginPath();
    for(var n=0;n<100;n++){
        var x=parseInt(Math.random()*width);
        var y=parseInt(Math.random()*height);
        var radius=Math.random()*1.5;
        ctx.arc(x,y,radius,0,Math.PI*2,false);
        ctx.closePath();
    }
    ctx.fillStyle="white";
    ctx.fill();
}