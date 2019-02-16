const FREQUENT_SEARCHES_KEY = 'frequentSearches';
var gFrequentSearches;

function initGallery() {
    gFrequentSearches = createFrequentSearch();
    renderGallery();
}

function createFrequentSearch() {
    let frequentSearches = getFromStorage(FREQUENT_SEARCHES_KEY, false);
    if (!frequentSearches){
        frequentSearches = [
           {txt: 'storm', count: getRandomIntInclusive(17,32)}, {txt: 'earth', count: getRandomIntInclusive(14,32)}, {txt: 'air', count: getRandomIntInclusive(16,32)},
           {txt: 'fire', count: getRandomIntInclusive(17,32)}, {txt: 'thunder', count: getRandomIntInclusive(1,32)}, {txt: 'water', count: getRandomIntInclusive(1,32)},
           {txt: 'lava', count: getRandomIntInclusive(15,32)},
       ]
    }
    return frequentSearches;
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
    document.querySelector('#about').style.display = 'none';
    document.querySelector('#contact').style.display = 'none';
    document.querySelector('.main-header').classList.toggle('editor-mode');
    initMeme(imgId);

}

function onSearchInGallery(value) {
    gCurrPageIdx = 0;
    let gallery = getImagesToDisplay();
    // Filters the gallery to find keyTags which contain the search str
    gallery = gallery.filter(item => item.keywords.findIndex(key => key.toLowerCase().includes(value.toLowerCase())) !== -1);
    renderGallery(gallery);
}