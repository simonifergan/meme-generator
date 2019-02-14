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


// Render divs to canvas and export as img

function onExportImg(ev) {
    renderImageToCanvas()
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}

function renderImageToCanvas() {
    let containerRect = document.querySelector('.canvas-container').getBoundingClientRect();
    let elLine = document.querySelectorAll('.edit-line');
    console.log(containerRect);
    elLine.forEach(line => {
        console.log(line);
        let txt = line.innerHTML;
        let fontSize = 16;
        let {top, left} = line.getBoundingClientRect();
        let x = left - containerRect.left - 33.5;
        let y = top - containerRect.top + fontSize;

        drawText(txt, x, y, fontSize);
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



// New drag attempt

function onInitDragEl(el) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.onmousedown = onDragDown;


    function onDragDown(ev) {
        ev = ev || window.event;
        ev.preventDefault();
        // get the mouse cursor position at startup:
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

// // DRAG IMAGE --- SCRAP ---
// var container = document.querySelector(".canvas-container");
// var currLine;

// var active = false;
// var currentX;
// var currentY;
// var initialX;
// var initialY;
// var xOffset = 0;
// var yOffset = 0;

// container.addEventListener("touchstart", startDrag, false);
// container.addEventListener("touchend", endDrag, false);
// container.addEventListener("touchmove", dragEl, false);

// container.addEventListener("mousedown", startDrag, false);
// container.addEventListener("mouseup", endDrag, false);
// container.addEventListener("mousemove", dragEl, false);

// function startDrag(ev) {
//     ev.stopPropagation();
//     if (ev.target.id === "appCanvas") return;
//     if (ev.type === "touchstart") {
//         initialX = ev.touches[0].clientX - xOffset;
//         initialY = ev.touches[0].clientY - yOffset;
//     } else {
//         initialX = ev.clientX - xOffset;
//         initialY = ev.clientY - yOffset;
//     }

//     currLine = ev.target;
//     active = true;
// }

// function endDrag(ev) {
//     initialX = currentX;
//     initialY = currentY;
//     currLine.style.top = parseInt(ev.target.style.top) + currentY + 'px';
//     currLine.style.left = parseInt(ev.target.style.left) + currentX + 'px';
//     renderElTranslate(0, 0, currLine);
//     currLine = null;
//     active = false;
// }

// function dragEl(ev) {
//     if (active) {

//         ev.preventDefault();

//         if (ev.type === "touchmove") {
//             currentX = ev.touches[0].clientX - initialX;
//             currentY = ev.touches[0].clientY - initialY;
//         } else {
//             currentX = ev.clientX - initialX;
//             currentY = ev.clientY - initialY;
//         }

//         xOffset = currentX;
//         yOffset = currentY;

//         renderElTranslate(currentX, currentY, currLine);
//     }
// }

// function renderElTranslate(xPos, yPos, el) {
//     el.style.transform = `translate3d(${xPos}px, ${yPos}px, ${0})`;
// }
