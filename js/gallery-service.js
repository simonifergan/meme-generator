var gGallery;

function initImgs() {
    gGallery = createGallery();
}

function createGallery() {
    let imgs = [];
    for (let i = 0; i < 9; i++) {
        let src = `./img/${i}.jpg`;
        let keyTags = ['Pukimonster'];
        let img = createItem(src, keyTags)
        imgs.push(img);
    }

    return imgs;
}

function createItem(src = './img/error.png', keyTags = []) {
    return {
        id: generateId(),
        src: src,
        keyTags: keyTags,
    }
}

function getGallryToDisplay() {
    return gGallery.slice();
}

function getItemById(id) {
    return gGallery.find(img => img.id === id);
}