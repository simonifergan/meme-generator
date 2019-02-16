var gCanvas;
var gCurrImg;
var gCtx;
var gSelectedImg;

// For dragging text
var gCurrText;
var gStartX;
var gStartY;

function initCanvas() {
    document.querySelector('#app').style.display = 'grid';
    gCanvas = document.getElementById("appCanvas");
    gCanvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    gCtx = gCanvas.getContext('2d');
    gSelectedImg = getMemeImage();

    resizeCanvas();
    requestAnimationFrame(drawToCanvas);
}

function resizeCanvas() {
    let elCanvasContainer = document.querySelector(".canvas-container")
    // let aspect = gCanvas.height / gCanvas.width;
    gCanvas.width = elCanvasContainer.offsetWidth;
    gCanvas.height = elCanvasContainer.offsetHeight;
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
function onAddText() {
    addText();
}

function onStartDrag(ev) {
    ev.preventDefault();
    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;

    console.log('Canvas offsent', offsetX, offsetY);
    console.log('client pos', ev.clientX, ev.clientY);
    gStartX = parseInt(ev.clientX - offsetX);
    gStartY = parseInt(ev.clientY - offsetY);
    console.log('calculation of exactly where on canvas', gStartX, gStartY);
    // console.log('I AM CLICKING HERE', x, y);
    gCurrText = getTextByLocation(gStartX, gStartY);
    console.log(ev);
    console.log('FOUND YOU', gCurrText);
}

function onDragText(ev) {
    if (!gCurrText) {
        return;
    }
    ev.preventDefault();
    let offsetX = gCanvas.offsetLeft;
    let offsetY = gCanvas.offsetTop;
    let mouseX = parseInt(ev.clientX - offsetX);
    let mouseY = parseInt(ev.clientY - offsetY);

    // Put your mousemove stuff here
    var distanceX = mouseX - gStartX;
    var distanceY = mouseY - gStartY;
    gStartX = mouseX;
    gStartY = mouseY;

    gCurrText.x += distanceX;
    gCurrText.y += distanceY;
}

function onStopDrag(ev) {
    ev.preventDefault();
    gCurrText = false;
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

}

function onExportImg(ev) {
    // let elCanvasContainer = document.querySelector('.canvas-container');
    // gCanvas.width = elCanvasContainer.offsetWidth;
    // gCanvas.height = elCanvasContainer.offsetHeight;
    // gCtx.fillStyle = '#000';
    // gCtx.rect(0,0, gCanvas.width, gCanvas.height)
    // gCtx.drawImage(gSelectedImg, 0, 0, gCanvas.width, gCanvas.height);
    // renderContentToCanvas()
    let imgData = gCanvas.toDataURL();
    ev.target.href = `${imgData}`;
}

// Switch back from gallery to editor
function onShowGallery() {
    document.querySelector('#app').style = "display: none;";
    document.querySelector('#gallery').hidden = false;
    // document.querySelectorAll('.edit-line').forEach(line => {
    //     line.style.display = 'block';
    // })
}
