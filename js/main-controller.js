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
    // Hide modal content
    document.querySelector('.message-sent-container').style.display = 'none';
    document.querySelector('.float-search-container').style.display = 'none';
    document.body.classList.remove('show');
}

function onToggleSearchModal() {
    document.querySelector('.float-search-container').style.display = 'flex';
    onToggleModal();
}

// send message will toggle modal for now
function onSendMessage(ev) {
    ev.preventDefault()
    document.querySelector('.message-sent-container').style.display = 'flex';
    onToggleModal();
}

