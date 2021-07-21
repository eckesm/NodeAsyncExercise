// Exercise 1

async function getCardFromNewDeck() {
	const res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
	try {
		console.log('EXERCISE 1:', prepareValueAndSuit(res.data.cards[0]));
	} catch (e) {
		console.log('ERROR!', e);
	}
}

function prepareValueAndSuit(cardObj) {
	return `${cardObj.value.toLowerCase()} of ${cardObj.suit.toLowerCase()}`;
}

getCardFromNewDeck();

// ----------------------------------------------
// Exercise 2

async function get2CardsFromDeck() {
	let cards = [];
	try {
		const card1Res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
		cards.push(card1Res.data.cards[0]);
		const card2Res = await axios.get(`https://deckofcardsapi.com/api/deck/${card1Res.data.deck_id}/draw/?count=1`);
		cards.push(card2Res.data.cards[0]);
		for (let card of cards) {
			console.log('EXERCISE 2:', prepareValueAndSuit(card));
		}
	} catch (e) {
		console.log('ERROR!', e);
	}
}

get2CardsFromDeck();

// ----------------------------------------------
// Exercise 3

let deckId;
const drawButton = document.getElementById('drawButton');
const cardsContainer = document.getElementById('cardsContainer');
drawButton.addEventListener('click', drawAndDisplayNewCard);

async function getNewDeck() {
	const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
	try {
		deckId = res.data.deck_id;
		console.log('EXERCISE 3:', deckId);
		drawButton.hidden = false;
	} catch (e) {
		console.log('ERROR!', e);
	}
}

async function drawAndDisplayNewCard() {
	const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
	try {
		console.log('EXERCISE 3:', res.data.remaining, ' reamining cards.');
		displayCard(res.data.cards[0]);
	} catch (e) {
		console.log('EXERCISE 3: Deck is out cards.');
		drawButton.disabled = true;
		console.log('ERROR!', e);
	}
}

function displayCard(card) {
	const cardImg = document.createElement('img');
	cardImg.src = card.image;
	cardsContainer.append(cardImg);
}

getNewDeck();
