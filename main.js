let collectionCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    // Check if there are collected cards in localStorage
    const collectedCards = JSON.parse(localStorage.getItem("collectedCards")) || [];

    if (collectedCards.length > 0) {
        // Iterate through collected cards and collect each one
        collectedCards.forEach(cardId => {
            collect(cardId);
        });
    }
});

function collect(cardId) {
    let collected = document.getElementById(cardId);

    if (collected && collected.classList.contains('uncollected')) {
        collected.classList.remove('uncollected');
        collectionCount++;
        document.getElementById("count").innerHTML = collectionCount;

        // Store the collected cardId in localStorage
        let collectedCards = JSON.parse(localStorage.getItem("collectedCards")) || [];
        collectedCards.push(cardId);
        localStorage.setItem("collectedCards", JSON.stringify(collectedCards));
    }
}

function resetEverything() {
    // Reset the collection count
    collectionCount = 0;
    document.getElementById("count").innerHTML = collectionCount;

    // Reset the collected cards in localStorage
    localStorage.removeItem("collectedCards");

    // Add the "uncollected" class to all cards
    const uncollectedCards = document.querySelectorAll('.uncollected');
    uncollectedCards.forEach(card => {
        card.classList.add('uncollected');
    });
}