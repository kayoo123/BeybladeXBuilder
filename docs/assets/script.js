const cardWrappers = document.querySelectorAll('.card-wrapper'); // Sélectionner tous les paquets
const miniaturesContainer = document.querySelector('.miniature-container');
const returnButton = document.querySelector('.return-button');
let currentCardIndex = 0;
let allCards = []; // Pour stocker toutes les cartes
let currentDeckIndex = 0; // Pour suivre quel paquet est ouvert

// Charger les cartes depuis le fichier JSON
fetch('cards.json')
    .then(response => response.json())
    .then(data => {
        allCards = data; // Stocker toutes les cartes
        loadRandomCards(); // Charger les cartes pour chaque paquet
    })
    .catch(error => console.error('Erreur lors du chargement des cartes:', error));

// Fonction pour obtenir un tableau de cartes aléatoires avec possibilité de duplication
function getRandomCards(array, count) {
    const randomCards = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        randomCards.push(array[randomIndex]);
    }
    return randomCards;
}

// Fonction pour charger des cartes aléatoires pour chaque paquet
function loadRandomCards() {
    cardWrappers.forEach((wrapper) => {
        const cards = getRandomCards(allCards, 5);
        displayCards(wrapper, cards);
    });
}

// Fonction pour afficher les cartes dans le conteneur
function displayCards(wrapper, cards) {
    const cardsContainer = wrapper.querySelector('.card-back');
    cardsContainer.innerHTML = ''; // Réinitialiser le conteneur des cartes
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.name; // Afficher le nom de la carte
        cardsContainer.appendChild(cardElement);
    });
}

// Écouteur d'événements pour le clic sur chaque paquet
cardWrappers.forEach((wrapper, index) => {
    wrapper.addEventListener('click', () => {
        currentDeckIndex = index; // Mettre à jour l'index du paquet courant
        if (!wrapper.classList.contains('open')) {
            wrapper.classList.add('open');
            currentCardIndex = 0; // Réinitialiser l'index des cartes
            revealNextCard(wrapper);
        } else {
            revealNextCard(wrapper);
        }
    });
});

// Fonction pour révéler la prochaine carte
function revealNextCard(wrapper) {
    const cards = wrapper.querySelectorAll('.card');
    if (currentCardIndex < cards.length) {
        cards[currentCardIndex].classList.add('active');
        currentCardIndex++;
    } else {
        showMiniatures(wrapper);
    }
}

// Fonction pour afficher les miniatures des cartes révélées
function showMiniatures(wrapper) {
    const cards = wrapper.querySelectorAll('.card');
    miniaturesContainer.innerHTML = ''; // Réinitialiser le conteneur des miniatures

    cards.forEach((card) => {
        const miniature = document.createElement('div');
        miniature.classList.add('miniature-card');
        miniature.textContent = card.textContent; // Afficher le nom de la carte
        miniaturesContainer.appendChild(miniature);
    });

    returnButton.style.display = 'block';
    miniaturesContainer.parentElement.style.display = 'flex';
}

// Écouteur d'événements pour le bouton Retour
returnButton.addEventListener('click', returnToDeck);

// Fonction pour retourner le paquet et repiocher des cartes
function returnToDeck() {
    const currentWrapper = cardWrappers[currentDeckIndex]; // Obtenir le paquet courant
    currentWrapper.style.display = 'block'; // Réafficher le paquet
    currentWrapper.classList.remove('open'); // Réinitialiser l'état du paquet
    currentCardIndex = 0; // Réinitialiser l'index pour une nouvelle session
    const cardElements = currentWrapper.querySelectorAll('.card');
    cardElements.forEach(card => card.classList.remove('active')); // Masquer toutes les cartes
    miniaturesContainer.innerHTML = ''; // Réinitialiser le conteneur des miniatures
    returnButton.style.display = 'none'; // Masquer le bouton Retour

    // Recharger 5 nouvelles cartes aléatoires pour le paquet courant
    const cards = getRandomCards(allCards, 5);
    displayCards(currentWrapper, cards); // Afficher les nouvelles cartes
}
