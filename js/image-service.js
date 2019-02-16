var gImages;

function initImages() {
    gImages = createImages();
}

function createImages() {
    let imgs = [];
    imgs.push(createImage());
    for (let i = 0; i < 9; i++) {
        let src = `./img/meme/${i}.jpg`;
        let keywords = ['Pukimonster', 'Lichmit', 'Banana'];
        let img = createImage(src, keywords)
        imgs.push(img);
    }
    for (let i = 0; i < 9; i++) {
        let src = `./img/meme/${i}.jpg`;
        let keywords = ['Abadi', 'Chalumi', 'Zahav'];
        let img = createImage(src, keywords)
        imgs.push(img);
    }
    for (let i = 0; i < 9; i++) {
        let src = `./img/meme/${i}.jpg`;
        let keywords = ['Abadi', 'Chalumi', 'Zahav'];
        let img = createImage(src, keywords)
        imgs.push(img);
    }
    for (let i = 0; i < 9; i++) {
        let src = `./img/meme/${i}.jpg`;
        let keywords = ['Abadi', 'Chalumi', 'Zahav'];
        let img = createImage(src, keywords)
        imgs.push(img);
    }

    return imgs;
}

function createImage(src = './img/meme/error.png', keywords = ['Error']) {
    return {
        id: generateId(),
        src: src,
        keywords: keywords,
    }
}

function getImagesToDisplay() {
    return gImages.slice();
}

function getImageById(id) {
    return gImages.find(img => img.id === id);
}