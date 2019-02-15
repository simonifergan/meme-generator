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
    document.querySelector('.input-container').innerHTML = `<div ondblclick="onToggleSelected(event, this)" onmousemove="onInitDragEl(this)" draggable="true"
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