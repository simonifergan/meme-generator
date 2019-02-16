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
    gMeme.txts.push({
        id: generateId(),
        txt: 'Enter Text Here',
        x: x,
        y: y,
        color: '#fff',
        fontSize: 30,
        isSelected: true,
    });

    // // save meme to SESSION storage only on ADDTEXT
    // setToStorage(MEME_KEY, gMeme, true);
}


function getAllTexts() {
    return gMeme.txts;
}
// Hittest for the text
function getTextByLocation(x, y) {
    return gMeme.txts.find(txt => {
        // console.log(txt.x, txt.y);
        let txtWidth = txt.x + gCtx.measureText(txt.txt).width;
        let txtHeight = txt.y - txt.fontSize;
        // console.log(x, txt.x, x, txtWidth, y, txt.y, y, txtHeight)
        // console.log(x >= txt.x, x <= txtWidth, y >= txt.y, y <= txtHeight)
        return x >= txt.x && x <= txtWidth && y <= txt.y && y >= txtHeight;
    });
}
// return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);

function moveText(xD, yD) {
    console.log('hello');
    gMeme.txts[0].x += xD;
    gMeme.txts[0].y += yD;
}

function getMemeImage() {
    return gMeme.selectedImg;
}