/*jslint indent:4*/
/*global $*/

$(function () {


    var PIANO_KEY_FREQUENCIES = {
        "C3": 130.81,
        "Db3": 138.59,
        "D3": 146.83,
        "Eb3": 155.56,
        "E3": 164.81,
        "F3": 174.61,
        "Gb3": 185.00,
        "G3": 196.00,
        "Ab3": 207.65,
        "A3": 220.00,
        "Bb3": 233.08,
        "B3": 246.94,
        "C4": 261.63,
        "Db4": 277.18,
        "D4": 293.66,
        "Eb4": 311.13,
        "E4": 329.63,
        "F4": 349.23,
        "Gb4": 369.99,
        "G4": 392.00,
        "Ab4": 415.30,
        "A4": 440.00,
        "Bb4": 466.16,
        "B4": 493.88,
        "C5": 523.25,
        "Db5": 554.37,
        "D5": 587.33,
        "Eb5": 622.25,
        "E5": 659.26,
        "F5": 698.46,
        "Gb5": 739.99,
        "G5": 783.99,
        "Ab5": 830.61,
        "A5": 880.00,
        "Bb5": 932.33,
        "B5": 987.77
    };
    var ZOOM_INC = Math.PI / 2;

    var visCanvasJQ = $('#visualisation_canvas');
    var visCanvas = visCanvasJQ[0];
    var visContext = visCanvas.getContext('2d');

    visCanvas.height = visCanvasJQ.height();
    visCanvas.width = visCanvasJQ.width();

    var visCenterHeight = Math.ceil(visCanvas.height / 2);
    var visCanvasWidth = visCanvas.width;


    // Default to the width of 10 * the period of C4.
    var frequencyDisplayed = 261.63 / 10;
    var zoomLevel = visCanvas.width * frequencyDisplayed;

    var calculateY = function (x, key) {
        var freq = PIANO_KEY_FREQUENCIES[key];
        var y = Math.sin(x * freq);
        return y;
    };


    var playingKeys = {};

    var updateVisualisation = function () {

        visContext.fillStyle = "#EEE";
        visContext.fillRect(0, 0, visCanvas.width, visCanvas.height);

        visContext.strokeStyle = "black";
        visContext.lineWidth = 2;
        visContext.beginPath();

        var x, y, scaledX, keys, noteTotal, noteCount, i;
        var xScaler = 2 * Math.PI / zoomLevel;
        var placed = false;
        for (x = 1; x < visCanvasWidth; x++) {
            scaledX = x * xScaler;

            keys = Object.keys(playingKeys);
            noteTotal = 0;
            noteCount = keys.length;
            for (i = keys.length - 1; i >= 0; i--) {
                noteCount += 1;
                noteTotal += calculateY(scaledX, keys[i]);
            }

            y = visCenterHeight - (noteTotal / noteCount) * visCenterHeight;
            if (placed) {
                visContext.lineTo(x, y);
            } else {
                visContext.moveTo(x, y);
                placed = true;
            }
        }
        visContext.stroke();
    };

    visCanvasJQ.on('mousewheel', function (e) {
        if (e.originalEvent.deltaY > 0) {
            zoomLevel = zoomLevel / ZOOM_INC;
        } else {
            zoomLevel = zoomLevel * ZOOM_INC;
        }
        frequencyDisplayed = zoomLevel / visCanvas.width;
        $('#hud').text("Time shown approx. " + frequencyDisplayed.toPrecision(4) + "Hz");
        updateVisualisation();
    });


    // Show another line (e.g. the individual notes)

    // visContext.beginPath();
    // visContext.moveTo(eq(1), visCenterHeight);
    // visContext.strokeStyle = "blue";
    // visContext.lineWidth = 1;

    // xScaler = visCanvasWidth / (periodScale * 2 * Math.PI);
    // for (x = 1; x < visCanvasWidth; x++) {
    //     scaledX = x / xScaler;
    //     y = visCenterHeight - eq(scaledX) * visCenterHeight;
    //     visContext.lineTo(x, y);
    // }
    // visContext.stroke();



    $('.piano-key').on('click', function (e) {
        var key = e.currentTarget;
        var keyID = key.id;
        if (PIANO_KEY_FREQUENCIES[keyID]) {
            if (playingKeys[keyID]) {
                delete playingKeys[keyID];
            } else {
                playingKeys[keyID] = true;
            }
            $(key).toggleClass('playing-key');
            updateVisualisation();
        }
    });


});
