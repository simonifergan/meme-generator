function renderGallery() {
    let gallery = getGallryToDisplay();
    // 
    // <img src="${item.src}"/ >
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