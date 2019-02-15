'use strict';

// Globals
var gCanvas;
var gCtx;
var gImg;
var gNextInputId;
var gImgRatio;


function initEditor(imgId) {
    gNextInputId = 3;

    document.querySelector('#app').style.display = 'grid';
    gCanvas = document.querySelector('#appCanvas');
    gCtx = gCanvas.getContext('2d');
    let { src } = getItemById(imgId);
    gImg = new Image();
    setImgSrc(src);
    setCanvasSize();
 
}

function setCanvasSize() {
    gImgRatio = calcAspectRatio(gCanvas.width, gCanvas.height, gImg.width, gImg.height);
    // gCanvas.width = window.innerWidth * gImgRatio;
    // gCanvas.height = window.innerHeight / gImgRatio;
    let canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.style.width = gCanvas.width * gImgRatio + 'px';
    canvasContainer.style.height = gCanvas.height + 'px';
}

// Draw image to canvas
function drawImg() {
    gCtx.clearRect(0,0, gCanvas.width, gCanvas.height);
    gCtx.drawImage(gImg, 0, 0, gCanvas.width * gImgRatio, gCanvas.height);
};

// Load image and draw it functions
// Todo: Modal that says: wait until image loads.
function setImgSrc(src) {
    gImg.onload = drawImg;
    gImg.src = src;
};



// Render divs to canvas and export it as img (jpg)
function onExportImg(ev) {
    renderContentToCanvas()
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}

// Switch back from gallery to editor
function onShowGallery() {
    document.querySelector('#app').style = "display: none;";
    document.querySelector('#gallery').hidden = false;
    document.querySelectorAll('.edit-line').forEach(line => {
        line.style.display = 'block';
    })
}

// Add line to editor
function onAddLine() {
    document.querySelector('.input-container').innerHTML += getInputLineHtml();
}

// Toggle box if is selected on dblclick
function onToggleSelected(ev, el) {
    if (ev.ctrlKey) el.classList.toggle('selected');
    else {
        onRemoveSelected();
        el.classList.toggle('selected');
    }
}

function onRemoveSelected() {
    document.querySelectorAll('.edit-line').forEach(line => {
        line.classList.remove('selected');
    })
}

// Changes the font for all the selected boxes
function onChangeFontForSelected(val) {
    document.querySelector('.span-font-slider').innerText = val + 'px';
    document.querySelectorAll('.edit-line.selected').forEach(line => {
        line.style.fontSize = parseInt(val) + 'px';
    });
}

// Removes target line
function onRemoveLine(id) {
    let el = document.querySelector(`.edit-line.line-id-${id}`);
    el.remove();
}

// A pattern for how each input line on the editor should look like
function getInputLineHtml() {
    return `<div ondblclick="onToggleSelected(event, this)" onmousemove="onInitDragEl(this)" draggable="true" 
                onclick="event.stopPropagation();"
                class="edit-line line-id-${gNextInputId} flex align-center" style="top: 155px; left: 155px">
                <span class="actual-text" contenteditable="true">Enter text here</span>
                <button onclick="onRemoveLine('${gNextInputId++}')" class="btn btn-delete">&times;</button>
            </div>`;
} 