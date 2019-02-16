function onOffscreenToggle() {
    document.querySelector('.trigram-container').classList.toggle('show');
}

function onOffscreenClose() {
    document.querySelector('.trigram-container').classList.remove('show');
}

function onToggleModal() {
    document.querySelector('.modal-screen').classList.toggle('show');
    document.body.classList.toggle('show');

}

function onCloseModal(ev) {
    document.querySelector('.modal-screen').classList.remove('show');
    document.body.classList.remove('show');
}