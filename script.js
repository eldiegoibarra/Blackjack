const playerNamePrompt = prompt("Ready to play? Please enter your name:");

let player = {
  name: playerNamePrompt,
  chips: 200,
};

let cards = [];
let dealerCards = [];
let sum = 0;
let dealerSum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let dealerCardsEl = document.getElementById("dealer-cards-el");
let playerEl = document.getElementById("player-el");
let startGame = document.getElementById("start-game");
let newCard = document.getElementById("new-card");
let standGame = document.getElementById("stand-game");

if (player.name) {
  playerEl.textContent = player.name + ": $" + player.chips;
} else {
  playerEl.textContent = "Joe Doe" + ": $" + player.chips;
}

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function resetGame() {
  isAlive = true;
  hasBlackJack = false;
  cards = [];
  dealerCards = [];
  sum = 0;
  dealerSum = 0;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  message = "Do you want to draw a new card?";
  renderGame();
}

startGame.addEventListener("click", resetGame);

newCard.addEventListener("click", function () {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
});

standGame.addEventListener("click", function () {
  if (isAlive && !hasBlackJack) {
    isAlive = false;
    dealerTurn();
  }
});

function dealerTurn() {
  while (dealerSum < 17) {
    let card = getRandomCard();
    dealerSum += card;
    dealerCards.push(card);
  }

  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Your Cards: " + cards.join(", ");
  sumEl.textContent = "Your Sum: " + sum;

  dealerCardsEl.textContent = "Dealer's Cards: " + dealerCards.join(", ");
  dealerCardsEl.textContent += " (Sum: " + dealerSum + ")";

  if (sum > 21) {
    message = "You lose!";
  } else if (sum === 21) {
    message = "You win! Blackjack!";
    hasBlackJack = true;
  } else if (!isAlive) {
    while (dealerSum < 17) {
      let card = getRandomCard();
      dealerSum += card;
      dealerCards.push(card);
    }
    if (dealerSum > 21) {
      message = "Dealer busts! You win!";
    } else if (dealerSum === 21) {
      message = "Dealer has Blackjack! You lose!";
    } else if (sum > dealerSum) {
      message = "You win!";
    } else if (sum < dealerSum) {
      message = "You lose!";
    } else {
      message = "It's a tie!";
    }
  } else {
    message = "Do you want to draw a new card?";
  }

  messageEl.textContent = message;
}
