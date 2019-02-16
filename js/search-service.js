const FREQUENT_SEARCHES_KEY = 'frequentSearches';
var gFrequentSearches;

function createFrequentSearches() {
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


function getFrequentSearchesToDisplay() {
    if (!gFrequentSearches) gFrequentSearches = createFrequentSearches();
    return gFrequentSearches;
}


// the function  decreases all the values of the keys which were not selected, and increases the value of the selected key by +1
function updateFrequentSearch(selectedKey) {
    gFrequentSearches.forEach((value, key) => {
        if (key !== selectedKey) {
            gFrequentSearches.set(key, value - 1);
            if (gFrequentSearches.get(key) < 0) gFrequentSearches.delete(key);
        } else gFrequentSearches.set(key, value + 1);
    });
}