const IMAGES_PER_PAGE = 18;
var gCurrPageIdx;

function initGallery() {
    gCurrPageIdx = 0;
    renderGallery();
    // renderPageButtons();
}

function renderGallery(gallery = getImagesToDisplay()) {
    // let maxImagesToDisplay = gCurrPageIdx * IMAGES_PER_PAGE + IMAGES_PER_PAGE;
    // gallery = gallery.slice(gCurrPageIdx * IMAGES_PER_PAGE, maxImagesToDisplay);
    // if (gallery) return 'No images to display.';
    strHtmls = gallery.map(item => {
        return `<div class="gallery-item hexagon" onclick="onStartEditor('${item.id}')">
                    <div class="hexagon-before" style="background-image: url('${item.src}');"></div>
                </div>
                <div class="gallery-item blank-spot">
                </div>`;
                
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
}

function renderPageButtons() {
    let images = getImagesToDisplay();
    let maxPages = images.length / IMAGES_PER_PAGE;
    let strHtml = ''
    for (let i = 0; i < maxPages; i++) {
        strHtml += `<button class="btn btn-page" onclick="onChangePage(${i})">${i + 1}</button>`
    }
    document.querySelector('.select-page-container').innerHTML = strHtml;
}

function onChangePage(pageNum) {
    gCurrPageIdx = pageNum;
    renderGallery();
}

function onStartEditor(imgId) {
    document.querySelector('#gallery').hidden = true;
    initEditor(imgId);

}

function onSearchInGallery(value) {
    gCurrPageIdx = 0;
    let gallery = getImagesToDisplay();
    // Filters the gallery to find keyTags which contain the search str
    gallery = gallery.filter(item => item.keywords.findIndex(key => key.toLowerCase().includes(value.toLowerCase())) !== -1);
    renderGallery(gallery);
}