"use strict";

const precision = 0.001;

const vnmWhite = "#fffff1";
const vnmBlue = "#0213b0";

const canvasAspectRatio = 1;
const canvasPreviewScale = 0.5;
const canvasWidth = 1024;

function floatEqual(value1, value2) {
    return Math.abs(value1 - value2) < precision;
}

function getAtLeast(value, limit) {
    return (value > limit) ? value : limit;
}

function getAtMost(value, limit) {
    return (value < limit) ? value : limit;
}


function draw() {
    const font = document.getElementById("font-selector").value;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = vnmBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = vnmWhite;

    const displayText = {
        "text": document.getElementById("display-text").value,
        "x": canvas.width / 2,
        "y": undefined,
        "size": canvas.width / 5,
    };

    ctx.font = `${displayText.size}px ${font}`;
    const displayTextMetrics = ctx.measureText(displayText.text);
    const displayTextHeight = displayTextMetrics.actualBoundingBoxAscent + displayTextMetrics.actualBoundingBoxDescent;

    const spacingToDisplayText = displayText.size / 8;

    const subLeftText = {
        "text": document.getElementById("sub-left-text").value,
        "x": getAtLeast(
            displayText.x - displayTextMetrics.width / 2,
            0.1 * canvas.width
        ),
        "y": undefined,
        "size": displayText.size / 4,
    };
    const subRightText = {
        "text": document.getElementById("sub-right-text").value,
        "x": getAtMost(
            displayText.x + displayTextMetrics.width / 2,
            0.9 * canvas.width
        ),
        "y": undefined,
        "size": subLeftText.size,
    };

    ctx.font = `${subLeftText.size}px ${font}`;
    const subLeftTextMetrics = ctx.measureText(subLeftText.text);
    const subRightTextMetrics = ctx.measureText(subRightText.text);
    const subTextHeight = Math.max(
        subLeftTextMetrics.actualBoundingBoxAscent + subLeftTextMetrics.actualBoundingBoxDescent,
        subRightTextMetrics.actualBoundingBoxAscent + subRightTextMetrics.actualBoundingBoxDescent,
    );

    const totalTextHeight = floatEqual(subTextHeight, 0) ?
        displayTextHeight :
        displayTextHeight + spacingToDisplayText + subTextHeight;


    displayText.y = (canvas.height - totalTextHeight) / 2;
    subLeftText.y = displayText.y + displayTextHeight + spacingToDisplayText;
    subRightText.y = subLeftText.y;

    const subTextAlign = Math.max(
        subLeftTextMetrics.actualBoundingBoxAscent,
        subRightTextMetrics.actualBoundingBoxAscent,
    );


    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.font = `${displayText.size}px ${font}`;
    ctx.fillText(displayText.text, displayText.x,
        displayText.y + displayTextMetrics.actualBoundingBoxAscent,
        0.8 * canvas.width);

    ctx.textAlign = "start";
    ctx.font = `${subLeftText.size}px ${font}`;
    ctx.fillText(subLeftText.text, subLeftText.x,
        subLeftText.y + subTextAlign);

    ctx.textAlign = "end";
    ctx.fillText(subRightText.text, subRightText.x,
        subRightText.y + subTextAlign);

    const downloadButton = document.getElementById("download-button");
    downloadButton.download = `vnm-${displayText.text}-${subLeftText.text}-${subRightText.text}`;
    downloadButton.href = canvas.toDataURL();
}

function main() {
    const canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvas.width / canvasAspectRatio;
    canvas.style.width = `${canvas.width * canvasPreviewScale}px`;
    canvas.style.height = `${canvas.height * canvasPreviewScale}px`;
    draw();
}

window.onload = main;