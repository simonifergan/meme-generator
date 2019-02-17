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
    document.querySelector('#app').style.display = 'grid';
    gCanvas = document.getElementById("appCanvas");
    gCanvas.onselectstart = function () { return false; }
    gCtx = gCanvas.getContext('2d');
    gSelectedImg = getMemeImage();

    // Prepare canvas
    resizeCanvas();
    addEventsToCanvas()
    renderTexts();

    // create first text top of page
    onAddText();
    gSelectedText.x = parseInt((gCanvas.width / 2) - gCtx.measureText(gSelectedText).width / 2);
    gSelectedText.y = 40;
    // Start rendering
    gIsEditing = true;
    requestAnimationFrame(drawToCanvas);
}

function addEventsToCanvas() {
    // Click
    gCanvas.addEventListener('click', onSelectText);

    // Mouse events
    gCanvas.addEventListener('mousedown', onStartDrag);
    gCanvas.addEventListener('mousemove', onDragText);
    gCanvas.addEventListener('mouseup', onStopDrag);

    // TODO: Touch events
    // gCanvas.addEventListener("touchstart", onStartDrag, false);
    // gCanvas.addEventListener("touchmove", onDragText, false);
    // gCanvas.addEventListener("touchend", onStopDrag, false);
}

function resizeCanvas() {
    let elCanvasContainer = document.querySelector(".canvas-container");
    let aspectRatio = gSelectedImg.width / gSelectedImg.height;
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
    });
}

function drawToCanvas() {
    if (!gIsEditing) return;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage();
    drawText();
    requestAnimationFrame(drawToCanvas);
}

// ---------- SELECT TEXT FUNCS
function renderTexts() {
    // if on mobile skip this section and go to renderMobileTextSelectors
    if (document.body.clientWidth <= 850) {
        renderMobileTextSelectors();
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

// When invoked the meme editor will have buttons to select texts instead of a select element
function renderMobileTextSelectors() {
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
    deSelectAllTexts();
    gSelectedText = getTextById(id);
    selectTextForEdit();
}
// END OF SELECT TEXT FUNCS ------------ //

function onAddText() {
    deSelectAllTexts();
    gSelectedText = addText();
    selectTextForEdit();
    renderTexts();
}

function onDeleteText() {
    if (!gSelectedText) return;
    deleteText(gSelectedText.id);
    onChangeSelectedText('');
    renderTexts();
}

// Canvas mouse events
function onStartDrag(ev) {
    ev.preventDefault();

    let canvasRect = gCanvas.getBoundingClientRect();
    gMouseX = ev.clientX - canvasRect.left;
    gMouseY = ev.clientY - canvasRect.top

    gDragText = getTextByLocation(gMouseX, gMouseY);
}

function onDragText(ev) {
    ev.preventDefault();
    if (!gDragText) return;
    deSelectAllTexts();

    let canvasRect = gCanvas.getBoundingClientRect();
    let mouseX = parseInt(ev.clientX - canvasRect.left);
    let mouseY = parseInt(ev.clientY - canvasRect.top);
    let dragDistanceX = mouseX - gMouseX;
    let dragDistanceY = mouseY - gMouseY;

    gMouseX = mouseX;
    gMouseY = mouseY;

    gDragText.x += dragDistanceX;
    gDragText.y += dragDistanceY;

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
    let centerText = false;
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
        case 'center':
            centerText = true;
            break;
    }

    // Assign new location
    if (!centerText) {
        // Check borders pre-assignment
        let newX = gSelectedText.x + xDistance;
        let newY = gSelectedText.y + yDistance;
        if (newX <= 0 ||
            newX + gCtx.measureText(gSelectedText.txt).width >= gCanvas.width ||
            newY - gSelectedText.fontSize <= 0
            || newY >= gCanvas.height) return;
        gSelectedText.x += xDistance;
        gSelectedText.y += yDistance;
    } else {
        // If center button was pressed skip the above and center text
        gSelectedText.x = parseInt((gCanvas.width / 2) - gCtx.measureText(gSelectedText).width / 2);
        gSelectedText.y = parseInt(gCanvas.height / 2);
    }
    gPrevTextColor = gSelectedText.color;
    gSelectedText.color = '#ee5253';
    setTimeout((txt, color) => { txt.color = color; }, 100, gSelectedText, gPrevTextColor);
}

function onChangeFontSize(fontSize) {
    document.querySelector('.span-font-slider').innerHTML = fontSize;
    if (gSelectedText) {
        gSelectedText.fontSize = fontSize;
    }
}

// If text was passed through selectBox/buttons - find it by id, otherwise find it with mouse click
function onSelectText(ev) {
    deSelectAllTexts();
    let canvasRect = gCanvas.getBoundingClientRect();

    let mouseX = parseInt(ev.clientX - canvasRect.left);
    let mouseY = parseInt(ev.clientY - canvasRect.top);

    gSelectedText = getTextByLocation(mouseX, mouseY);
    if (gSelectedText) gSelectedText.color = '#0abde3';
    selectTextForEdit();
}

// Show the selected text respectively in the input box
function selectTextForEdit() {
    let elInput = document.querySelector('#currTextInput');
    if (gSelectedText) {
        elInput.value = gSelectedText.txt;
        gSelectedText.color = '#0abde3';
    }
    else {
        elInput.value = 'Select text to edit.';
        deSelectAllTexts();
    }
}

// De-selecting texts = returning all to white (default) color;
function deSelectAllTexts() {
    getTextsToDisplay().forEach(txt => { txt.color = '#fff' });
}

// On input change - update text
function onChangeText(val) {
    if (!gSelectedText) return;
    gSelectedText.txt = val;
    renderTexts();
}

// Export image to user
function onExportImg(ev) {
    // Make sure all text is white regardless of selected or moved/dragged
    getTextsToDisplay().forEach(txt => { txt.color = '#fff'; });
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