const FREQUENT_SEARCHES_KEY = 'frequentSearches';
var gFrequentSearches;

function initGallery() {
    gFrequentSearches = createFrequentSearch();
    renderGallery();
    renderFrequentSearches();
}

function createFrequentSearch() {
    let frequentSearches = getFromStorage(FREQUENT_SEARCHES_KEY, false);
    if (!frequentSearches) {
        frequentSearches = new Map();
        frequentSearches.set('storm', getRandomIntInclusive(17, 32));
        frequentSearches.set('earth', getRandomIntInclusive(14, 32));
        frequentSearches.set('air', getRandomIntInclusive(16, 32));
        frequentSearches.set('fire', getRandomIntInclusive(17, 32));
        frequentSearches.set('thunder', getRandomIntInclusive(1, 32));
        frequentSearches.set('water', getRandomIntInclusive(1, 32));
        frequentSearches.set('lava', getRandomIntInclusive(15, 32));
        frequentSearches.set('banana', 26);
        frequentSearches.set('pukimonster', 40);
    }
    return frequentSearches;
}

function renderFrequentSearches() {
    console.log('I AM HERE', gFrequentSearches)
    let elContainer = document.querySelector('.float-search-container');
    let strHtmls = [];
    gFrequentSearches.forEach((value, key) => {
        let fontSize = (value >= 16) ? value : 16; // minimum font-size will be 16, the rest will get font-size through count
        strHtmls.push(`<button class="btn btn-search-keyword" style="font-size: ${fontSize}px;">${key}</button>`);

    })

    elContainer.innerHTML = strHtmls.join('');
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
    // Filters the gallery to find keywords which contain the search str
    gallery = gallery.filter(item => item.keywords.findIndex(key => key.toLowerCase().includes(value.toLowerCase())) !== -1);
    renderGallery(gallery);
}