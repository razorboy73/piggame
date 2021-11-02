'use strict';

const btnNew = document.querySelector('.btn--new');
//Select score elements
const player0ScoreEl = document.getElementById('score--0');
const player1ScoreEl = document.getElementById('score--1');
const player0ScoreCurrent = document.getElementById('current--0');
const player1ScoreCurrent = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const diceRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gamePlay = true;
let winScore = 100;

btnNew.addEventListener('click', resetBoard);
diceRoll.addEventListener('click', rollDie);
btnHold.addEventListener('click', holdScore);
resetBoard();

function resetBoard() {
  diceEl.classList.add('hide');
  diceRoll.classList.remove('hide');
  btnHold.classList.remove('hide');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  player0ScoreEl.textContent = '0';
  player1ScoreEl.textContent = '0';
  scores = [0, 0];
  player0ScoreCurrent.textContent = 0;
  player1ScoreCurrent.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  gamePlay = true;
}

//Rolling dice functionality
function rollDie() {
  if (gamePlay) {
    if (diceEl.classList.contains('hide')) {
      diceEl.classList.remove('hide');
    }
    //generate random roll
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);
    //generate image
    diceEl.src = `dice-${diceNumber}.png`;
    //if 1 is rolled, remove points and switch player
    if (diceNumber != 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      if (scores[activePlayer] + currentScore > winScore) {
        console.log('scores[activePlayer]: ', scores[activePlayer]);
        win();
      }
    } else {
      //document.getElementById(`score--${activePlayer}`).textContent = 0;
      changePlayer();
    }
  }
}

function holdScore() {
  if (gamePlay) {
    console.log('Active Player: ', activePlayer);
    console.log('Score Held');
    //add current score to active player if aggregate score is under 100
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] > winScore) {
      win();
    } else {
      changePlayer();
    }
    //Che player
  }
}

function win() {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  gamePlay = false;
  diceEl.classList.add('hide');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  console.log(gamePlay);
}
function changePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
}
//     if (activePlayer === 'player0') {
//       console.log('the current player is: ', activePlayer);
//       scorePlayer0current += diceNumber;
//       player0ScoreCurrent.textContent = scorePlayer0current;
//     } else {
//       console.log('the current player is: ', activePlayer);
//       scorePlayer1current += diceNumber;
//       player1ScoreCurrent.textContent = scorePlayer1current;
//     }
//   } else {
//     if (activePlayer === 'player0') {
//       scorePlayer0current = 0;
//       player0ScoreCurrent.textContent = scorePlayer0current;
//       player0ScoreEl.textContent = 0;
//       currentPlayer = 'player1';
//     } else {
//       scorePlayer1current = 0;
//       player1ScoreCurrent.textContent = scorePlayer1current;
//       player1ScoreEl.textContent = 0;
//       currentPlayer = 'player0';
//     }
// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener('click', openModal);
// }

// modalClsBtn.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);
// document.addEventListener('keydown', function (event) {
//   if (event.key === 'Escape') {
//     if (!modalWindow.classList.contains('hidden')) {
//       closeModal();
//     }
//   }
// });

// function openModal() {
//   modalWindow.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// }

// function closeModal() {
//   modalWindow.classList.add('hidden');
//   overlay.classList.add('hidden');
// }
