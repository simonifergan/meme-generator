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
    // TODO: calculate aspect ratio
    let canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.style.width = gCanvas.width + 'px';
    canvasContainer.style.height = gCanvas.height + 'px';
    setImgSrc(src);
}


function setCanvasSize() {


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


// Render divs to canvas and export as img

function onExportImg(ev) {
    renderImageToCanvas()
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}

function renderImageToCanvas() {
    let containerRect = document.querySelector('.canvas-container').getBoundingClientRect();
    let elLine = document.querySelectorAll('.actual-text');
    elLine.forEach(line => {
        let txt = line.innerText;
        let fontSize = parseInt(window.getComputedStyle(line, null).getPropertyValue('font-size'));
        let { top, left } = line.getBoundingClientRect();
        let x = left - containerRect.left;
        let y = top - containerRect.top + fontSize;

        drawText(txt, x, y, fontSize);
        line.style.display = 'none';
    });
    document.querySelector('.input-container').innerHTML = `<div onclick="onToggleSelected(event, this)" onmousemove="onInitDragEl(this)" draggable="true"
                                                                class="edit-line line-id-${gNextInputId} flex align-center" style="display: none; top: 155px; left: 155px">
                                                                <span class="actual-text" contenteditable="true">Enter text here</span>
                                                                <button onclick="onRemoveLine(${gNextInputId++})" class="btn btn-delete">&times;</button>
                                                            </div>`;
}

function drawText(txt, divX, divY, fontSize) {
    gCtx.font = `${fontSize}px Impact`;
    gCtx.strokeStyle = '#000';
    gCtx.lineWidth = Math.floor(fontSize / 10);
    gCtx.strokeText(`${txt}`, divX, divY);
    gCtx.fillStyle = '#fff';
    gCtx.fillText(`${txt}`, divX, divY);
}



// New drag attempt

function onInitDragEl(el) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.onmousedown = onDragDown;


    function onDragDown(ev) {
        ev = ev || window.event;
       
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        document.onmouseup = onStopDrag;

        // call a function whenever the cursor moves:
        document.onmousemove = onDragEl;
    }

    function onDragEl(ev) {
        ev = ev || window.event;
        ev.preventDefault();

        // calculate the new cursor position:
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;

        // set the element's new position:
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function onStopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
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