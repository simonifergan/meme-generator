var gGallery;

function initImgs() {
    gGallery = createGallery();
}

function createGallery() {
    let imgs = [];
    for (let i = 0; i < 9; i++) {
        let src = `./img/${i}.jpg`;
        let keywords = ['Pukimonster'];
        let img = createItem(src, keywords)
        imgs.push(img);
    }

    return imgs;
}

function createItem(src = './img/error.png', keywords = []) {
    return {
        id: generateId(),
        src: src,
        keywords: keywords,
    }
}

function getGallryToDisplay() {
    return gGallery.slice();
}

function getItemById(id) {
    return gGallery.find(img => img.id === id);
}