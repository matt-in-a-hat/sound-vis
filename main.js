/*jslint indent:4*/
/*global $*/

$(function () {

    var eq = function (x) {
        var y = Math.sin(x);
        return y;
    };

    var eq2 = function (x) {
        var y = Math.sin(4 * x);
        return y;
    };

    var periodScale = 4;


    var visCanvasJQ = $('#visualisation_canvas');
    var visCanvas = visCanvasJQ[0];
    var visContext = visCanvas.getContext('2d');

    visCanvas.height = visCanvasJQ.height();
    visCanvas.width = visCanvasJQ.width();

    var visCenterHeight = Math.ceil(visCanvas.height / 2);
    var visCanvasWidth = visCanvas.width;

    visContext.strokeStyle = "black";
    visContext.lineWidth = 2;
    visContext.beginPath();
    visContext.moveTo(eq(1), visCenterHeight);

    var x, y, scaledX;
    var xScaler = visCanvasWidth / (periodScale * 2 * Math.PI);
    for (x = 1; x < visCanvasWidth; x++) {
        scaledX = x / xScaler;
        y = visCenterHeight - ((eq(scaledX) + eq2(scaledX)) / 2) * visCenterHeight;
        visContext.lineTo(x, y);
    }
    visContext.stroke();


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


    // visContext.beginPath();
    // visContext.moveTo(eq(1), visCenterHeight);
    // visContext.strokeStyle = "red";
    // visContext.lineWidth = 1;

    // xScaler = visCanvasWidth / (periodScale * 2 * Math.PI);
    // for (x = 1; x < visCanvasWidth; x++) {
    //     scaledX = x / xScaler;
    //     y = visCenterHeight - eq2(scaledX) * visCenterHeight;
    //     visContext.lineTo(x, y);
    // }
    // visContext.stroke();

});