function renderGallery(gallery = getGallryToDisplay()) {

    strHtmls = gallery.map(item => {
        return `<div class="gallery-item hexagon" onclick="onStartEditor('${item.id}')">
                    <div class="hexagon-before" style="background-image: url('${item.src}');"></div>
                </div>`
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
}

function onStartEditor(imgId) {
    document.querySelector('#gallery').hidden = true;
    initEditor(imgId);

}

function onSearchInGallery(value) {
    let gallery = getGallryToDisplay();
    // Filters the gallery to find keyTags which contain the search str
    gallery = gallery.filter(item => item.keywords.findIndex(key => key.toLowerCase().includes(value.toLowerCase())) !== -1);
    renderGallery(gallery);
}