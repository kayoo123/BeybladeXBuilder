const cardWrappers = document.querySelectorAll('.card-wrapper'); // Sélectionner tous les paquets
const miniaturesContainer = document.querySelector('.miniature-container');
const returnButton = document.querySelector('.return-button');
let currentCardIndex = 0;
let cards = [];
let cardData = []; // Variable pour stocker les données des cartes

// Charger les cartes depuis le fichier JSON
fetch('cards.json')
    .then(response => response.json())
    .then(data => {
        cardData = data; // Stocker les données dans une variable globale
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

// Fonction pour charger des cartes aléatoires en fonction du pack sélectionné
function loadRandomCards(packNumber) {
    // Filtrer les cartes du pack sélectionné
    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            const filteredCards = data.filter(card => card.pack === packNumber);
            // Obtenir 5 cartes aléatoires du pack filtré
            cards = getRandomCards(filteredCards, 5);
            displayCards();
        })
        .catch(error => console.error('Erreur lors du chargement des cartes:', error));
}


// Fonction pour afficher les cartes dans le conteneur
function displayCards() {
    const cardsContainer = document.querySelector('.card-wrapper.open .card-back'); // Conteneur pour les cartes
    cardsContainer.innerHTML = ''; // Réinitialiser le conteneur des cartes
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.name; // Afficher le nom de la carte
        cardsContainer.appendChild(cardElement);
    });
}

// Écouteur d'événements pour le clic sur chaque paquet
cardWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        // Masquer les autres paquets
        cardWrappers.forEach(otherWrapper => {
            if (otherWrapper !== wrapper) {
                otherWrapper.classList.add('hidden');
            }
        });

        // Ouvrir le paquet sélectionné
        if (!wrapper.classList.contains('open')) {
            wrapper.classList.add('open');
            currentCardIndex = 0; // Réinitialiser l'index pour le nouveau paquet
            const packNumber = wrapper.getAttribute('data-pack'); // Obtenir le numéro de pack
            loadRandomCards(packNumber); // Charger les cartes pour le pack sélectionné
            
            // Révéler immédiatement la première carte
            revealNextCard(); // Révéler la première carte
        } else {
            revealNextCard(); // Révéler la prochaine carte
        }
    });
});

// Fonction pour révéler la prochaine carte
function revealNextCard() {
    if (currentCardIndex < cards.length) {
        const cardElements = document.querySelectorAll('.card-wrapper.open .card');
        cardElements[currentCardIndex].classList.add('active');
        currentCardIndex++;
    } else {
        showMiniatures();
    }
}

// Fonction pour afficher les miniatures des cartes révélées
function showMiniatures() {
    const cardWrapper = document.querySelector('.card-wrapper.open'); // Obtenir le paquet ouvert
    cardWrapper.style.display = 'none';
    miniaturesContainer.innerHTML = '';

    cards.forEach((card) => {
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

// Fonction pour retourner au paquet et repiocher des cartes
function returnToDeck() {
    const cardWrapper = document.querySelector('.card-wrapper.open');
    cardWrapper.classList.remove('centered'); // Retirer la classe centrée
    cardWrapper.classList.remove('open');
    currentCardIndex = 0;

    // Réinitialiser les éléments de cartes et les miniatures
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => card.classList.remove('active'));
    miniaturesContainer.innerHTML = '';
    returnButton.style.display = 'none';

    // Réafficher tous les decks
    cardWrappers.forEach(wrapper => wrapper.classList.remove('hidden'));
}
