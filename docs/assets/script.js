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

// Fonction pour charger des cartes aléatoires en fonction du pack
function loadRandomCards(packNumber) {
    const filteredCards = cardData.filter(card => card.pack === packNumber); // Filtrer par pack
    cards = getRandomCards(filteredCards, 5); // Tirer 5 cartes aléatoires
    displayCards();
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
    const cardWrapper = document.querySelector('.card-wrapper.open'); // Obtenir le paquet ouvert
    cardWrapper.style.display = 'block'; // Réafficher le paquet
    cardWrapper.classList.remove('open'); // Réinitialiser l'état du paquet
    currentCardIndex = 0; // Réinitialiser l'index pour une nouvelle session
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => card.classList.remove('active')); // Masquer toutes les cartes
    miniaturesContainer.innerHTML = ''; // Réinitialiser le conteneur des miniatures
    returnButton.style.display = 'none'; // Masquer le bouton Retour

    // Réafficher tous les paquets
    cardWrappers.forEach(wrapper => {
        wrapper.classList.remove('hidden'); // Afficher tous les paquets
    });
}
