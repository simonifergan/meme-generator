function setToStorage(key, value, isSession = false) {
    if (!isSession) localStorage.setItem(key, JSON.stringify(value));
    else sessionStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, isSession = false) {
    if (!isSession) return JSON.parse(localStorage.getItem(key));
    else return JSON.parse(sessionStorage.getItem(key));
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }

 function calcAspectRatio(width, height) {
     return width / height;
 }