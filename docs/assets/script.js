const cardWrappers = document.querySelectorAll('.card-wrapper');
const miniaturesContainer = document.querySelector('.miniature-container');
const returnButton = document.querySelector('.return-button');
let currentCardIndex = 0;
let cards = [];
let cardData = [];

// Charger les cartes depuis le fichier JSON
fetch('cards.json')
    .then(response => response.json())
    .then(data => {
        cardData = data;
    })
    .catch(error => console.error('Erreur lors du chargement des cartes:', error));

function getRandomCards(array, count) {
    const randomCards = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        randomCards.push(array[randomIndex]);
    }
    return randomCards;
}

function loadRandomCards(packNumber) {
    const filteredCards = cardData.filter(card => card.pack === packNumber);
    cards = getRandomCards(filteredCards, 5);
    displayCards();
}

function displayCards() {
    const cardsContainer = document.querySelector('.card-wrapper.open .card-back');
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.src = `images/pokemon/${card.name}.webp`;
        cardImage.alt = card.name;

        cardElement.appendChild(cardImage);
        cardsContainer.appendChild(cardElement);
    });
}

cardWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        cardWrappers.forEach(otherWrapper => {
            if (otherWrapper !== wrapper) {
                otherWrapper.classList.add('hidden');
            }
        });

        if (!wrapper.classList.contains('open')) {
            wrapper.classList.add('open');
            currentCardIndex = 0;
            const packNumber = wrapper.getAttribute('data-pack');
            loadRandomCards(packNumber);
            revealNextCard();
        } else {
            revealNextCard();
        }
    });
});

function revealNextCard() {
    if (currentCardIndex < cards.length) {
        const cardElements = document.querySelectorAll('.card-wrapper.open .card');
        const currentCard = cardElements[currentCardIndex];
        currentCard.style.display = 'flex';
        setTimeout(() => {
            currentCard.classList.add('active');
        }, 10);
        currentCardIndex++;
    } else {
        showMiniatures();
    }
}

function showMiniatures() {
    const cardWrapper = document.querySelector('.card-wrapper.open');
    cardWrapper.style.display = 'none';
    miniaturesContainer.innerHTML = '';

    cards.forEach((card) => {
        const miniature = document.createElement('div');
        miniature.classList.add('miniature-card');

        const miniatureImage = document.createElement('img');
        miniatureImage.src = `images/pokemon/${card.name}.webp`;
        miniatureImage.alt = card.name;

        miniature.appendChild(miniatureImage);
        miniaturesContainer.appendChild(miniature);
    });

    returnButton.style.display = 'block';
    miniaturesContainer.parentElement.style.display = 'flex';
}

returnButton.addEventListener('click', returnToDeck);

function returnToDeck() {
    const cardWrapper = document.querySelector('.card-wrapper.open');
    cardWrapper.style.display = 'block';
    cardWrapper.classList.remove('open');
    cardWrapper.style.transform = '';

    currentCardIndex = 0;
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => card.classList.remove('active'));
    miniaturesContainer.innerHTML = '';
    returnButton.style.display = 'none';

    cardWrappers.forEach(wrapper => wrapper.classList.remove('hidden'));
}
