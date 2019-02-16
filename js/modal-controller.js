function onToggleModal() {
    document.querySelector('.modal-screen').classList.toggle('show');
    document.body.classList.toggle('show');

}

function onCloseModal() {
    document.querySelector('.modal-screen').classList.remove('show');
    document.body.classList.remove('show');
}