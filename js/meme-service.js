const MEME_KEY = 'lastMeme';
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
        fontSize: 20,
        isSelected: true,
    };
    gMeme.txts.push(txt)
    return txt;
    // // save meme to SESSION storage only on ADDTEXT
    // setToStorage(MEME_KEY, gMeme, true);
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
        let txtHeight = txt.y - txt.fontSize;
        return x >= txt.x && x <= txtWidth && y <= txt.y && y >= txtHeight;
    });
}

function moveText(xD, yD) {
    console.log('hello');
    gMeme.txts[0].x += xD;
    gMeme.txts[0].y += yD;
}

function getMemeImage() {
    return gMeme.selectedImg;
}

function getTextsToDisplay() {
    return gMeme.txts.slice();
}