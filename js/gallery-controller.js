function renderGallery() {
    let gallery = getImgsToDisplay();
    // style="background-image: url('${img.src}')"
    // 
    strHtmls = gallery.map(item => {
        return `<div class="gallery-item" onclick="onStartEditor('${item.id}')" >
                    <img src="${item.src}"/ >
                </div>`
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
}

function onStartEditor(imgId) {
    document.querySelector('#gallery').hidden = true;
    initEditor(imgId);

}