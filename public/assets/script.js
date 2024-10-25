const cardWrapper = document.querySelector('.card-wrapper');
const cards = document.querySelectorAll('.card');
const miniaturesContainer = document.querySelector('.miniature-container'); // Conteneur pour les miniatures
const returnButton = document.querySelector('.return-button'); // Sélectionner le bouton Retour
let currentCardIndex = 0;

// Écouteur d'événements pour le clic sur le paquet
cardWrapper.addEventListener('click', () => {
  // Ouvrir le paquet si ce n'est pas déjà fait
  if (!cardWrapper.classList.contains('open')) {
    cardWrapper.classList.add('open');
    revealNextCard(); // Appeler immédiatement la fonction pour révéler la première carte
  } else {
    // Révéler la prochaine carte à chaque clic
    revealNextCard();
  }
});

// Fonction pour révéler la prochaine carte
function revealNextCard() {
  if (currentCardIndex < cards.length) {
    cards[currentCardIndex].classList.add('active');
    currentCardIndex++;
  } else {
    // Si toutes les cartes ont été révélées, afficher les miniatures
    showMiniatures();
  }
}

// Fonction pour afficher les miniatures des cartes révélées
function showMiniatures() {
  // Masquer le paquet de cartes
  cardWrapper.style.display = 'none'; // Masquer le paquet

  // Afficher la section des miniatures
  miniaturesContainer.innerHTML = ''; // Réinitialiser le contenu

  // Créer et ajouter les miniatures
  cards.forEach((card, index) => {
    const miniature = document.createElement('div');
    miniature.classList.add('miniature-card');
    miniature.textContent = `Card ${index + 1}`; // Afficher le numéro de la carte
    miniaturesContainer.appendChild(miniature);
  });

  // Afficher le bouton Retour
  returnButton.style.display = 'block'; 
  miniaturesContainer.parentElement.style.display = 'flex'; // Afficher le conteneur des miniatures
}

// Écouteur d'événements pour le bouton Retour
returnButton.addEventListener('click', returnToDeck);

// Fonction pour retourner le paquet
function returnToDeck() {
  cardWrapper.style.display = 'block'; // Réafficher le paquet
  cardWrapper.classList.remove('open'); // Réinitialiser l'état du paquet
  currentCardIndex = 0; // Réinitialiser l'index pour une nouvelle session
  cards.forEach(card => card.classList.remove('active')); // Masquer toutes les cartes
  miniaturesContainer.innerHTML = ''; // Réinitialiser le conteneur des miniatures
  returnButton.style.display = 'none'; // Masquer le bouton Retour
}
