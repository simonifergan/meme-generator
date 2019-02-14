'use strict';

// Globals
var gCanvas;
var gCtx;
var gImg;

function initEditor() {
    gCanvas = document.querySelector('#appCanvas');
    gCtx = gCanvas.getContext('2d');
    gImg = new Image();
    setImgSrc('./meme.jpg');
    let canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.style.width = gCanvas.width + 'px';
    canvasContainer.style.height = gCanvas.height + 'px';
}

// Load image and draw it functions
// Todo: Modal that says: wait until image loads.
function setImgSrc(src) {
    gImg.onload = drawImg;
    gImg.src = src;
};

function drawImg() {
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
};




// DRAG IMAGE
var container = document.querySelector(".canvas-container");
var currLine;

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(ev) {
    if (ev.type === "touchstart") {
        initialX = ev.touches[0].clientX - xOffset;
        initialY = ev.touches[0].clientY - yOffset;
    } else {
        initialX = ev.clientX - xOffset;
        initialY = ev.clientY - yOffset;
    }

    currLine = ev.target;
    active = true;
}

function dragEnd(ev) {
    initialX = currentX;
    initialY = currentY;
    currLine.style.top = parseInt(ev.target.style.top) + currentY + 'px';
    currLine.style.left = parseInt(ev.target.style.left) + currentX + 'px';
    renderElTranslate(0, 0, currLine);
    currLine = null;
    active = false;
}

function drag(ev) {
    if (active) {

        ev.preventDefault();

        if (ev.type === "touchmove") {
            currentX = ev.touches[0].clientX - initialX;
            currentY = ev.touches[0].clientY - initialY;
        } else {
            currentX = ev.clientX - initialX;
            currentY = ev.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        renderElTranslate(currentX, currentY, currLine);
    }
}

function renderElTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, ${0})`;
}

function onExportImg(ev) {
    renderImageToCanvas()
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}

function renderImageToCanvas() {
    let lines = document.querySelectorAll('.edit-line');
    console.log(lines[0]);
    lines.forEach(line => {
        console.log(line);
        let txt = line.innerHTML;
        let fontSize = 16;
        let divX = line.offsetLeft - (fontSize % 10)*10;
        let divY = line.offsetTop + fontSize - 2;
        drawText(txt, divX, divY, fontSize);
        line.style.display = 'none';
    });
}

function drawText(txt, divX, divY, fontSize) {
    gCtx.font = `${fontSize}px Impact`;
    gCtx.strokeStyle = '#e3e3e3';
    gCtx.lineWidth = Math.floor(fontSize / 10);
    gCtx.strokeText(`${txt}`, divX, divY);
    gCtx.fillStyle = '#333';
    gCtx.fillText(`${txt}`, divX, divY);
}