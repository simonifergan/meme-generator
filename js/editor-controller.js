// Global Variables

// To render canvas
var gCanvas;
var gCurrImg;
var gCtx;
var gIsEditing;
var gSelectedImg;

// For dragging text
var gDragText;
var gMouseX;
var gMouseY;

// Current selected text
var gSelectedText;
var gPrevTextColor;


// Editor Functions
function initCanvas() {
    gIsEditing = true;
    document.querySelector('#app').style.display = 'grid';
    gCanvas = document.getElementById("appCanvas");
    gCanvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    gCtx = gCanvas.getContext('2d');
    gSelectedImg = getMemeImage();


    resizeCanvas();
    addListenersToCanvas()
    renderTexts();
    requestAnimationFrame(drawToCanvas);
}

function addListenersToCanvas() {
    // Mouse events
    gCanvas.addEventListener('mousedown', onStartDrag);
    gCanvas.addEventListener('mousemove', onDragText);
    gCanvas.addEventListener('mouseup', onStopDrag);
    gCanvas.addEventListener('click', onSelectText);

    // TODO: Touch events
    // gCanvas.addEventListener('touchstart', onStartDrag);
    // gCanvas.addEventListener('touchmove', onDragText);
    // gCanvas.addEventListener('touchend', onStopDrag);
    // gCanvas.addEventListener('dblclick', onSelectText);
}

function resizeCanvas() {
    let elCanvasContainer = document.querySelector(".canvas-container");
    var aspectRatio = gSelectedImg.width / gSelectedImg.height;
    gCanvas.width = elCanvasContainer.clientWidth; 
    gCanvas.height = gCanvas.width / aspectRatio;
    elCanvasContainer.height = gCanvas.height;
}


function drawImage() {
    gCtx.drawImage(gMeme.selectedImg, 0, 0, gCanvas.width, gCanvas.height);

}

function drawText() {
    gMeme.txts.forEach(txt => {
        gCtx.font = `${txt.fontSize}px Impact`;
        gCtx.strokeStyle = '#000';
        gCtx.lineWidth = Math.floor(txt.fontSize / 10);
        gCtx.strokeText(`${txt.txt}`, txt.x, txt.y);
        gCtx.fillStyle = txt.color;
        gCtx.fillText(`${txt.txt}`, txt.x, txt.y);

    })
}

function drawToCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage();
    drawText();
    requestAnimationFrame(drawToCanvas);
}

// ---------- SELECT BOX
function renderTexts() {
    // if on mobile skip this section and go to renderTextsForMobile
    if (document.body.clientWidth <= 850) {
        renderTextsForMobile();
        return;
    }
    let elSelect = document.querySelector('#selectTextBox');
    let texts = getTextsToDisplay();
    let strHTMLS = [];

    if (texts.length <= 0) {
        strHTMLS.push(`<option value=""> -- No texts were created -- </option>`);
    } else {
        strHTMLS.push(`<option value=""> -- Select Text From Below -- </option>`);
        strHTMLS.push(...texts.map((txt, idx) => {
            return `<option value="${txt.id}">${idx + 1}. ${txt.txt}</option>`;
        }));
    }

    elSelect.innerHTML = strHTMLS.join('');
}

function renderTextsForMobile() {
    let elContainer = document.querySelector('.choose-text-container');
    let texts = getTextsToDisplay();
    let strHTMLS = texts.map((txt, idx) => {
        return `<button onclick="onChangeSelectedText('${txt.id}')" class="btn btn-change-text">
                ${idx + 1}
                </button>`;
    });
    elContainer.innerHTML = strHTMLS.join('');

}

function onChangeSelectedText(id) {
    gSelectedText = getTextById(id);
    selectTextForEdit();
}
// END OF SELECT BOX ------------ //

function onAddText() {
    addText();
    renderTexts();
}

function onDeleteText() {
    if (!gSelectedText) return;
    deleteText(gSelectedText.id);
    onChangeSelectedText('');
    renderTexts();
}

// Mouse events
function onStartDrag(ev) {
    ev.preventDefault();
    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;

    gMouseX = parseInt(ev.clientX - offsetX);
    gMouseY = parseInt(ev.clientY - offsetY);

    gDragText = getTextByLocation(gMouseX, gMouseY);
}

function onDragText(ev) {
    ev.preventDefault();
    if (!gDragText) return;

    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;
    let mouseX = parseInt(ev.clientX - offsetX);
    let mouseY = parseInt(ev.clientY - offsetY);

    var dragDistanceX = mouseX - gMouseX;
    var dragDistanceY = mouseY - gMouseY;
    gMouseX = mouseX;
    gMouseY = mouseY;

    gDragText.x += dragDistanceX;
    gDragText.y += dragDistanceY;
    gPrevTextColor = gDragText.color;
    gDragText.color = '#ee5253';
}

function onStopDrag(ev) {
    ev.preventDefault();
    gDragText = false;
}

// Movement controls for keypad
function onTextMove(dir) {
    if (!gSelectedText) return;
    let xDistance = 0;
    let yDistance = 0;
    switch (dir) {
        case 'up':
            yDistance -= 10;
            break;
        case 'down':
            yDistance += 10;
            break;
        case 'left':
            xDistance -= 10;
            break;
        case 'right':
            xDistance += 10;
            break;
    }

    // Check borders pre-assignment
    let newX = gSelectedText.x + xDistance;
    let newY = gSelectedText.y + yDistance;
    if (newX <= 0 ||
        newX + gCtx.measureText(gSelectedText.txt).width >= gCanvas.width || 
        newY - gSelectedText.fontSize <= 0 
        || newY >= gCanvas.height) return;

    // Assign new location
    gSelectedText.x += xDistance;
    gSelectedText.y += yDistance;
    gPrevTextColor = gSelectedText.color;
    gSelectedText.color = '#ee5253';
    setTimeout((txt, color)=> {txt.color = color;}, 300,gSelectedText, gPrevTextColor);
}

function onChangeFontForSelected(fontSize) {
    document.querySelector('.span-font-slider').innerHTML = fontSize;
    if (gSelectedText) {
        gSelectedText.fontSize = fontSize;
    }
}

// If text was passed through selectBox - find it by id, otherwise find it with mouse click
function onSelectText(ev) {

    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;

    let mouseX = parseInt(ev.clientX - offsetX);
    let mouseY = parseInt(ev.clientY - offsetY);

    gSelectedText = getTextByLocation(mouseX, mouseY);
    if (gSelectedText) gSelectedText.color = '#0abde3';
    selectTextForEdit();
}

// Show the selected text respectively in the input box
function selectTextForEdit() {
    let elInput = document.querySelector('#currTextInput');
    if (gSelectedText) {
        elInput.value = gSelectedText.txt;
        
    }
    else {
        elInput.value = 'Click on text to edit.'
        getTextsToDisplay().forEach(txt => {txt.color = '#fff'});
    }


}

// On input change - update text
function onChangeText(val) {
    gSelectedText.txt = val;
    renderTexts();
}
function onExportImg(ev) {
    // Make sure all text is white regardless of selected or moved/dragged
    getTextsToDisplay().forEach(txt => {txt.color = '#fff';});
    drawToCanvas();
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}


// Switch back from gallery to editor
function onShowGallery() {
    gIsEditing = false;
    document.querySelector('#app').style = "display: none;";
    document.querySelector('#gallery').hidden = false;
    document.querySelector('#about').style.display = 'flex';
    document.querySelector('#contact').style.display = 'flex';
    document.querySelector('.main-header').classList.toggle('editor-mode');
}

