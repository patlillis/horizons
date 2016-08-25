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
var $canvas;
var ctx;
// var fontLoaded = $.Deferred();
// var canvasLoaded = $.Deferred();

var dragging;
var mouseX;
var mouseY;
var dragHoldX;
var backgrounds = [];
var width;
var height;

function init() {
    resize();
    var s = Snap(width, height);
    var t = s.polygon((width/2) - 150, 0, width/2, 100, (width/2) + 150, 0);
    t.click(function() {
        if (repeatPlay(0)) {
            t.attr('fill', 'red');
        }
        else {
            t.attr('fill', 'black');
        }
    });
}

//Re-size
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
}