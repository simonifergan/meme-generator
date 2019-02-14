function renderGallery() {
    let imgs = getImgsToDisplay();
    // style="background-image: url('${img.src}')
    strHtmls = imgs.map(img => {
        return `<div class="gallery-item">
                    <img src="${img.src}"/ >
                </div>`
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
}