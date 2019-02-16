// Global Variables

// To render canvas
var gCanvas;
var gCurrImg;
var gCtx;
var gIsEditing;
var gSelectedImg;


// For dragging text
var gCurrDragText;
var gMouseX;
var gMouseY;

// Current selected text
var gSelectedText;


// Editor Functions
function initCanvas() {
    gIsEditing = true;
    document.querySelector('#app').style.display = 'grid';
    gCanvas = document.getElementById("appCanvas");
    gCanvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    gCtx = gCanvas.getContext('2d');
    gSelectedImg = new Image();
    gSelectedImg.src = getImageById(getMemeImageId()).src;
    gSelectedImg.onload = resizeCanvas;
    
}

function resizeCanvas() {
    let elCanvasContainer = document.querySelector(".canvas-container");
    // gCanvas.width = elCanvasContainer.offsetWidth;
    // gCanvas.height = elCanvasContainer.offsetHeight;
    var aspectRatio = gSelectedImg.width / gSelectedImg.height;
    gCanvas.width = elCanvasContainer.clientWidth;
    gCanvas.height = gCanvas.width / aspectRatio;
    elCanvasContainer.height = gCanvas.height;
    drawToCanvas();
}


function drawImage() {
    gCtx.drawImage(gMeme.selectedImg, 0, 0, gCanvas.width, gCanvas.height);

}

function drawText() {
    gMeme.txts.forEach(txt => {
        // draw rectangle around text when it is selected
        if (txt.isSelected) {
            let txtWidth = txt.x + gCtx.measureText(txt.txt).width;
            let txtHeight = txt.y - txt.fontSize;
            gCtx.save();
            gCtx.strokeStyle = '#2e86de';
            gCtx.strokeRect(txt.x + 5, txt.y + 5, txtWidth + 5, txtHeight + 5);
            gCtx.restore();
        }
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
function onAddText() {
    addText();
}

function onStartDrag(ev) {
    ev.preventDefault();
    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;

    // console.log('Canvas offsent', offsetX, offsetY);
    // console.log('client pos', ev.clientX, ev.clientY);
    gMouseX = parseInt(ev.clientX - offsetX);
    gMouseY = parseInt(ev.clientY - offsetY);
    // console.log('calculation of exactly where on canvas', gMouseX, gMouseY);
    // console.log('I AM CLICKING HERE', x, y);
    gCurrDragText = getTextByLocation(gMouseX, gMouseY);
    console.log(ev);
    console.log('FOUND YOU', gCurrDragText);
}

function onDragText(ev) {
    ev.preventDefault();
    if (!gCurrDragText) {
        return;
    } else selectTextForEdit();
    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;
    let mouseX = parseInt(ev.clientX - offsetX);
    let mouseY = parseInt(ev.clientY - offsetY);

    var dragDistanceX = mouseX - gMouseX;
    var dragDistanceY = mouseY - gMouseY;
    gMouseX = mouseX;
    gMouseY = mouseY;

    gCurrDragText.x += dragDistanceX;
    gCurrDragText.y += dragDistanceY;
}

function onStopDrag(ev) {
    ev.preventDefault();
    gCurrDragText = false;
}

// Movement controls
function onTextMove(dir, txt) {
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
    moveText(xDistance, yDistance)
}

function onChangeFontForSelected(ev, fontSize) {
    gMeme.txts[0].fontSize = fontSize;
}

function onSelectText(ev) {
    ev.stopPropagation();
    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;

    let mouseX = parseInt(ev.clientX - offsetX);
    let mouseY  = parseInt(ev.clientY - offsetY);

    gCurrDragText = getTextByLocation(mouseX, mouseY);
    if (gCurrDragText.isSelected) gCurrDragText.isSelected = true;
    else if (gCurrDragText) gCurrDragText.isSelected = false;
    else getAllTexts().forEach(txt => txt.isSelected = false);
}

function onExportImg(ev) {
   
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}

function selectTextForEdit() {}

// Switch back from gallery to editor
function onShowGallery() {
    gIsEditing = false;
    document.querySelector('#app').style = "display: none;";
    document.querySelector('#gallery').hidden = false;
}

