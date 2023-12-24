let collectionCount = 0;
let collected = [];
let progress = document.getElementById('progress');


// Load the collection from localStorage on page load
window.onload = function () {
    loadCollection();
    progress.style.width = ((collectionCount/139)* 100) + '%';
};

function collect(cardId) {
    let card = document.getElementById(cardId);

    if (card.classList.contains('uncollected')) {
        card.classList.replace('uncollected', 'collected');
        collectionCount++;
        collected.push(cardId);
    } else {
        card.classList.replace('collected', 'uncollected');
        collectionCount--;

        let cardRemove = collected.indexOf(cardId);
        if (cardRemove !== -1) {
            collected.splice(cardRemove, 1);
        }
    }
    document.getElementById('count').innerHTML = collectionCount;
    progress.style.width = ((collectionCount/139)* 100) + '%';

    // Save the collection to localStorage
    saveCollection();
}

function saveCollection() {
    let collectionData = {
        count: collectionCount,
        collected: collected,
    };

    localStorage.setItem('collectionData', JSON.stringify(collectionData));
}

function loadCollection() {
    let savedData = localStorage.getItem('collectionData');

    if (savedData) {
        let collectionData = JSON.parse(savedData);
        collectionCount = collectionData.count;
        collected = collectionData.collected;

        document.getElementById('count').innerHTML = collectionCount;

        for (let i = 0; i < collected.length; i++) {
            let cardId = collected[i];
            let card = document.getElementById(cardId);

            card.classList.replace('uncollected', 'collected');
        }
    }
}
