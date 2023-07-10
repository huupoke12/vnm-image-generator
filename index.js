const vnmWhite = "#fffff1";
const vnmBlue = "#0213b0";

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

    ctx.fillStyle = vnmBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const displayText = {
        "text": document.getElementById("display-text").value,
        "x": canvas.width / 2,
        "y": canvas.height / 2,
        "size": canvas.width / 5,
    };

    ctx.font = `${displayText.size}px ${font}`;

    const displayTextMetrics = ctx.measureText(displayText.text);
    const subLeftText = {
        "text": document.getElementById("sub-left-text").value,
        "x": getAtLeast(
            value = displayText.x - displayTextMetrics.width / 2,
            limit = 0.1 * canvas.width
        ),
        "y": displayText.y + displayText.size / 2,
        "size": displayText.size / 3,
    };
    const subRightText = {
        "text": document.getElementById("sub-right-text").value,
        "x": getAtMost(
            value = displayText.x + displayTextMetrics.width / 2,
            limit = 0.9 * canvas.width
        ),
        "y": subLeftText.y,
        "size": subLeftText.size,
    };


    ctx.fillStyle = vnmWhite;
    ctx.textAlign = "center";
    ctx.fillText(displayText.text, displayText.x, displayText.y, 0.8 * canvas.width);

    ctx.textAlign = "start";
    ctx.font = `${subLeftText.size}px ${font}`;
    ctx.fillText(subLeftText.text, subLeftText.x, subLeftText.y);

    ctx.textAlign = "end";
    ctx.fillText(subRightText.text, subRightText.x, subRightText.y);

    const downloadButton = document.getElementById("download-button");
    downloadButton.download = `vnm-${displayText.text}-${subLeftText.text}-${subRightText.text}`;
    downloadButton.href = canvas.toDataURL();
}
