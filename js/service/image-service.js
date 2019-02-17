var gImages;

function initImages() {
    gImages = createImages();
}

function createImages() {
    let imgs = [];
    imgs.push(createImage());
    for (let i = 0; i < 8; i++) {
        let src = `./img/meme/${i}.jpg`;
        let keywords = ['Monster', 'Awkward', 'Animal'];
        let img = createImage(src, keywords)
        imgs.push(img);
    }
    for (let i = 8; i < 16; i++) {
        let src = `./img/meme/${i}.jpg`;
        let keywords = ['Funny', 'Dangerous', 'Addicted'];
        let img = createImage(src, keywords)
        imgs.push(img);
    }
    for (let i = 16; i < 23; i++) {
        let src = `./img/meme/${i}.jpg`;
        let keywords = ['Happy', 'Sad', 'Terror'];
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

function addImage(src = './img/meme/error.png', keywords = ['Error']) {
    gImages.push(createImage(src, keywords));
}