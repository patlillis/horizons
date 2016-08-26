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

var t;

function init() {
    canvas = document.getElementById("cnvs")
    ctx = canvas.getContext("2d");

    resize();

    t = new Triangle(width, height);

    t.drawOnscreen(ctx);

    $(canvas).on('click', function(e) {
        if (t.hitTest(e.pageX, e.pageY)) {
            console.log('Hit!');
            play(0);
        }
    });
}

//Re-size
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height; 

    if (t) {
        t.resize(width, height);
        t.drawOnscreen(ctx);
    }
}