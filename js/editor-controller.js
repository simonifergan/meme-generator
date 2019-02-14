'use strict';

// Globals
var gCanvas;
var gCtx;
var gImg;
var gNextInputId;




function initEditor(imgId) {
    gNextInputId = 2;

    document.querySelector('#app').style.display = 'flex';
    gCanvas = document.querySelector('#appCanvas');
    gCtx = gCanvas.getContext('2d');
    let { src } = getItemById(imgId);
    gImg = new Image();
    setCanvasSize();
    let canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.style.width = gCanvas.width + 'px';
    canvasContainer.style.height = gCanvas.height + 'px';
    setImgSrc(src);
}


function setCanvasSize() {

    // TODO: calculate aspect ratio and change canvas accordingly

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


// Render divs to canvas and export it as img (jpg)

function onExportImg(ev) {
    renderImageToCanvas()
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}




function onShowGallery() {
    document.querySelector('#app').style.display = 'none';
    document.querySelector('#gallery').hidden = false;
    document.querySelectorAll('.edit-line').forEach(line => {
        line.style.display = 'block';
    })
}

function onAddLine() {
    let line = `<div onclick="onToggleSelected(event, this)" onmousemove="onInitDragEl(this)" draggable="true"
                    class="edit-line line-id-${gNextInputId} flex align-center" style="top: 155px; left: 155px">
                    <span class="actual-text" contenteditable="true">Enter text here</span>
                    <button onclick="onRemoveLine('${gNextInputId++}')" class="btn btn-delete">&times;</button>
                </div>`;
    document.querySelector('.input-container').innerHTML += line;
}

function onToggleSelected(ev, el) {
    if (ev.ctrlKey) el.classList.toggle('selected');
    else {
        onRemoveSelected();
        el.classList.toggle('selected');
    }
}

function onRemoveSelected() {
    document.querySelectorAll('edit-line').forEach(line => {
        console.log(line);
        line.classList.remove('selected');
    })
}

function onChangeFontForSelected(val) {
    document.querySelector('.span-font-slider').innerText = val + 'px';
    document.querySelectorAll('.edit-line.selected').forEach(line => {
        line.style.fontSize = parseInt(val) + 'px';
    });
}

function onRemoveLine(id) {
    let el = document.querySelector(`.edit-line.line-id-${id}`);
    el.remove();
}