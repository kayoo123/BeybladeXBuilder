const cardWrapper = document.querySelector('.card-wrapper');
const cardsContainer = document.querySelector('.card-back'); // Conteneur pour les cartes
const miniaturesContainer = document.querySelector('.miniature-container');
const returnButton = document.querySelector('.return-button');
let currentCardIndex = 0;
let cards = [];

// Charger les cartes depuis le fichier JSON
fetch('cards.json')
    .then(response => response.json())
    .then(data => {
        // Sélectionner aléatoirement 5 cartes
        cards = getRandomCards(data, 5);
        displayCards();
    })
    .catch(error => console.error('Erreur lors du chargement des cartes:', error));

// Fonction pour obtenir un tableau de cartes aléatoires
function getRandomCards(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Fonction pour afficher les cartes dans le conteneur
function displayCards() {
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.name; // Afficher le nom de la carte
        cardsContainer.appendChild(cardElement);
    });
}

// Écouteur d'événements pour le clic sur le paquet
cardWrapper.addEventListener('click', () => {
    if (!cardWrapper.classList.contains('open')) {
        cardWrapper.classList.add('open');
        revealNextCard();
    } else {
        revealNextCard();
    }
});

// Fonction pour révéler la prochaine carte
function revealNextCard() {
    if (currentCardIndex < cards.length) {
        const cardElements = document.querySelectorAll('.card');
        cardElements[currentCardIndex].classList.add('active');
        currentCardIndex++;
    } else {
        showMiniatures();
    }
}

// Fonction pour afficher les miniatures des cartes révélées
function showMiniatures() {
    cardWrapper.style.display = 'none';
    miniaturesContainer.innerHTML = '';

    cards.forEach((card, index) => {
        const miniature = document.createElement('div');
        miniature.classList.add('miniature-card');
        miniature.textContent = card.name; // Afficher le nom de la carte
        miniaturesContainer.appendChild(miniature);
    });

    returnButton.style.display = 'block';
    miniaturesContainer.parentElement.style.display = 'flex';
}

// Écouteur d'événements pour le bouton Retour
returnButton.addEventListener('click', returnToDeck);

// Fonction pour retourner le paquet
function returnToDeck() {
    cardWrapper.style.display = 'block';
    cardWrapper.classList.remove('open');
    currentCardIndex = 0;
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => card.classList.remove('active'));
    miniaturesContainer.innerHTML = '';
    returnButton.style.display = 'none';
}
