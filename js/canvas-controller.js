function setCanvasSize() {
    gCanvas.width = window.innerWidth * 0.5;
    gCanvas.height = window.innerHeight * 0.8;
    calculateAspectRatioFit(gCanvas.width, gCanvas.height)
    let canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.style.width = gCanvas.width + 'px';
    canvasContainer.style.height = gCanvas.height + 'px';
}

// Draw image to canvas
function drawImg() {
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
};


// Draw editor content to the canvas to prepare for export as an image file
function renderContentToCanvas() {
    let containerRect = document.querySelector('.canvas-container').getBoundingClientRect();
    let elLine = document.querySelectorAll('.actual-text');
    elLine.forEach(line => {
        let txt = line.innerText;
        let fontSize = parseInt(window.getComputedStyle(line, null).getPropertyValue('font-size'));
        let { top, left } = line.getBoundingClientRect();
        let x = left - containerRect.left;
        let y = top - containerRect.top + fontSize;

        drawText(txt, x, y, fontSize);
        line.remove();
    });
    document.querySelector('.input-container').innerHTML = getInputLineHtml();
    document.querySelector(`.edit-line`).style.display = 'none';
}

function drawText(txt, divX, divY, fontSize) {
    gCtx.font = `${fontSize}px Impact`;
    gCtx.strokeStyle = '#000';
    gCtx.lineWidth = Math.floor(fontSize / 10);
    gCtx.strokeText(`${txt}`, divX, divY);
    gCtx.fillStyle = '#fff';
    gCtx.fillText(`${txt}`, divX, divY);
}


// Function that controls the divs' dragging
function onInitDragEl(el) {
    var initPosX = 0;
    var initPosY = 0;
    var currClientX = 0;
    var currClientY = 0;
    el.onmousedown = onDragDown;

    function onDragDown(ev = window.event) {
        currClientX = ev.clientX;
        currClientY = ev.clientY;
        document.onmouseup = onStopDrag;
        document.onmousemove = onDragEl;
    }

    function onDragEl(ev = window.event) {
        ev.preventDefault();
        // let elCanvasContainer = document.querySelector('.canvas-container');
        // if (ev.clientX <= elCanvasContainer.offsetLeft 
        //     || ev.clientX >= gCanvas.width + elCanvasContainer.offsetLeft  
        //     || ev.clientY <= elCanvasContainer.offsetTop
        //     || ev.clientY >= gCanvas.height + elCanvasContainer.offsetTop) return;

        
        initPosX = currClientX - ev.clientX;
        initPosY = currClientY - ev.clientY;
        currClientX = ev.clientX;
        currClientY = ev.clientY;
        
        el.style.top = (el.offsetTop - initPosY) + "px";
        el.style.left = (el.offsetLeft - initPosX) + "px";
    }

    function onStopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}