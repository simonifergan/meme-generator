var gGallery;

function initImgs() {
    gGallery = createGallery();
}

function createGallery() {
    let imgs = [];
    for (let i = 0; i < 9; i++) {
        let src = `./img/${i}.jpg`;
        let keywords = ['Pukimonster', 'Lichmit', 'Banana'];
        let img = createItem(src, keywords)
        imgs.push(img);
    }
    for (let i = 0; i < 9; i++) {
        let src = `./img/${i}.jpg`;
        let keywords = ['Abadi', 'Chalumi', 'Zahav'];
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

function getGalleryToDisplay() {
    return gGallery.slice();
}

function getItemById(id) {
    return gGallery.find(img => img.id === id);
}