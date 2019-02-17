const FREQUENT_SEARCHES_KEY = 'frequentSearches';
var gFrequentSearches;

function createFrequentSearches() {
    let frequentSearches = getFromStorage(FREQUENT_SEARCHES_KEY, false);
    if (!frequentSearches) {
        frequentSearches = new Map();
        frequentSearches.set('monster', getRandomIntInclusive(17, 32));
        frequentSearches.set('awkward', getRandomIntInclusive(14, 32));
        frequentSearches.set('animal', getRandomIntInclusive(16, 32));
        frequentSearches.set('sad', getRandomIntInclusive(17, 32));
        frequentSearches.set('dangerous', getRandomIntInclusive(1, 32));
        frequentSearches.set('addicted', getRandomIntInclusive(1, 32));
        frequentSearches.set('terror', getRandomIntInclusive(15, 32));
        frequentSearches.set('funny', 26);
        frequentSearches.set('happy', 40);
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
            if (gFrequentSearches.get(key) <= 0) gFrequentSearches.delete(key);
        } else gFrequentSearches.set(key, value + 1);
    });
}