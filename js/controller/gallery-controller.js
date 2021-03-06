
function initGallery() {
   
    renderGallery();
    renderFrequentSearches();
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


function renderFrequentSearches() {
    let frequentSearches = getFrequentSearchesToDisplay();
    let elContainer = document.querySelector('.float-search-container');
    let strHtmls = [];
    frequentSearches.forEach((value, key) => {
        let rotateChance = (Math.random()*1 < 0.6 && value < 22)? 'transform: rotate(-90deg);' : '';
        let fontSize = (value >= 16) ? value : 16;  // minimum font-size will be 16, the rest will get font-size by count value.
        strHtmls.push(
            `<button class="btn btn-search-keyword" style="font-size: ${fontSize}px; ${rotateChance}" onclick="onFrequentSearchClick('${key}')">
                ${key}
            </button>`
        );
    });
    elContainer.innerHTML = strHtmls.join('');
}

function onFrequentSearchClick(key) {
    updateFrequentSearch(key);
    onCloseModal();
    onSearchInGallery(key);
    renderFrequentSearches();
}

// Allows the user to add an image from external sources
function onLinkImageFromURL(ev) {
    ev.preventDefault();
    let src = document.querySelector('#inputURL').value;
    let keywords = document.querySelector('#inputKeywords').value;
    keywords = keywords.split(/[, ]/g);
    keywords = keywords.filter(word => word.length > 0);
    addImage(src, keywords);
    renderGallery();
    onCloseModal();
}

function onSearchInGallery(value) {
    gCurrPageIdx = 0;
    let gallery = getImagesToDisplay();
    // Filters the gallery to find keywords which contain the search str
    gallery = gallery.filter(item => item.keywords.findIndex(key => key.toLowerCase().includes(value.toLowerCase())) !== -1);
    renderGallery(gallery);
}

// Start meme editor and hide homepage content
function onStartEditor(imgId) {
    document.querySelector('#gallery').hidden = true;
    document.querySelector('#about').style.display = 'none';
    document.querySelector('#contact').style.display = 'none';
    document.querySelector('.main-header').classList.toggle('editor-mode');
    initMeme(imgId);
}

