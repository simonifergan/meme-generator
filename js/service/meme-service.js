var gMeme;

function initMeme(imgId) {
    gMeme = {
        selectedImg: new Image(),
        txts: [],
    }

    gMeme.selectedImg.src = getImageById(imgId).src;
    gMeme.selectedImg.onload = initCanvas;
}

function addText(x = parseInt(gCanvas.width / 2), y = parseInt(gCanvas.height / 2)) {
    let txt = {
        id: generateId(),
        txt: 'Enter Text Here',
        x: x - gCtx.measureText('Enter Text Here').width / 2,
        y: y,
        color: '#fff',
        fontSize: 24,
        isSelected: true,
    };
    gMeme.txts.push(txt)
    return txt;
}

function deleteText(id) {
    let idx = gMeme.txts.findIndex(txt => txt.id === id);
    if (idx !== -1) gMeme.txts.splice(idx, 1);
}

function getAllTexts() {
    return gMeme.txts;
}

function getTextById(id) {
    return gMeme.txts.find(txt => txt.id === id)
}

// Hittest-box for the text
function getTextByLocation(x, y) {
    return gMeme.txts.find(txt => {
        let txtWidth = txt.x + gCtx.measureText(txt.txt).width;
        let txtHeight = txt.y - txt.fontSize+2;
        return x >= txt.x && x <= txtWidth && y <= txt.y && y >= txtHeight;
    });
}

function getMemeImage() {
    return gMeme.selectedImg;
}

function getTextsToDisplay() {
    return gMeme.txts.slice();
}