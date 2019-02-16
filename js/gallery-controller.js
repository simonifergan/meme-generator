

function initGallery() {
    renderGallery();
}

function renderGallery(gallery = getImagesToDisplay()) {

    strHtmls = gallery.map(item => {
        return `<div class="gallery-item hexagon" onclick="onStartEditor('${item.id}')">
                    <div class="hexagon-before" style="background-image: url('${item.src}');"></div>
                </div>
                <div class="gallery-item blank-spot">
                </div>`;
                
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
}


function onChangePage(pageNum) {
    gCurrPageIdx = pageNum;
    renderGallery();
}

function onStartEditor(imgId) {
    document.querySelector('#gallery').hidden = true;
    // document.querySelector('#appendix').hidden = true;
    initMeme(imgId);

}

function onSearchInGallery(value) {
    gCurrPageIdx = 0;
    let gallery = getImagesToDisplay();
    // Filters the gallery to find keyTags which contain the search str
    gallery = gallery.filter(item => item.keywords.findIndex(key => key.toLowerCase().includes(value.toLowerCase())) !== -1);
    renderGallery(gallery);
}