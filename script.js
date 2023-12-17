'use strict';

// Declaring Variables
const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');
const player1Current = document.getElementById('current--0');
const player2Current = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdPoints = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const scores = [0, 0];

let randomNumber,
  totalScore0,
  totalScore1,
  currentScore,
  activePlayer,
  playing,
  totalScore;

currentScore = 0;
activePlayer = 0;
totalScore = 0;
totalScore0 = 0;
totalScore1 = 0;
playing = 0;

// Setting Initial Values
player1Score.textContent = '0';
player2Score.textContent = '0';
diceEl.classList.add('hidden');

// Section to roll Dice
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing === 0) {
    // 1. Generate A Random Number Between 1-6
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display the number on the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check if the number is 1 or not
    if (dice !== 1) {
      // Add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // // Store the current score before resetting it

      // // Reset current score and switch player
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      // Switch active player
      activePlayer = activePlayer === 0 ? 1 : 0;

      // Toggle the active class between players
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

// Section for Holding the values
holdPoints.addEventListener('click', function () {
  if (playing === 0) {
    let scoreToAdd = currentScore;

    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (activePlayer === 0 && totalScore0 <= 100 && totalScore1 <= 100) {
      totalScore0 += scoreToAdd;
      player1Score.textContent = totalScore0;
    } else if (activePlayer === 1 && totalScore0 <= 100 && totalScore1 <= 100) {
      totalScore1 += scoreToAdd;
      player2Score.textContent = totalScore1;
    }

    if (totalScore0 >= 100 || totalScore1 >= 100) {
      playing = 1;
      if (totalScore0 >= 100) {
        player0.classList.add('player--winner');
      } else {
        player1.classList.add('player--winner');
      }
      return;
    }

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

// Section to Reset all values
newGame.addEventListener('click', function () {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceEl.classList.add('hidden');
  player1Current.textContent = '0';
  player2Current.textContent = '0';
  player1Score.textContent = '0';
  player2Score.textContent = '0';
  currentScore = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  activePlayer = 0;
  playing = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
});
