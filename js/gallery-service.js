var gImgs;

function initImgs() {
    gImgs = createImgs();
}

function createImgs() {
    let imgs = [];
    for (let i = 0; i < 7; i++) {
        let src = `./img/${i}.jpg`;
        let keyTags = ['Pukimonster'];
        let img = createImg(src, keyTags)
        imgs.push(img);
    }

    return imgs;
}

function createImg(src = './img/error.png', keyTags = []) {
    return {
        id: generateId(),
        src: src,
        keyTags: keyTags,
    }
}

function getImgsToDisplay() {
    return gImgs.slice();
}