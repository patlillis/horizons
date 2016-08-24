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

function repeatPlay(number, btn) {
    if (btn.classList.contains('playing')) {
        loops[number].stop();
        btn.classList.remove('playing');
    }
    else {
        loops[number].start();
        btn.classList.add('playing');
    }
}