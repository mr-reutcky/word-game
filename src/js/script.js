'use strict';

// Importing necessary modules
import { wordBank } from './word-bank.js';
import { select, listen, shuffleArray } from './utils.js';

// Score class to manage score-related properties
class Score {
  #date;
  #hits;
  #percentage;

  constructor(date, hits, percentage) {
    this.#date = date;
    this.#hits = hits;
    this.#percentage = ((percentage / 200) * 100).toFixed(2);
  }

  get date() {
    return this.#date;
  }

  get hits() {
    return this.#hits;
  }

  get percentage() {
    return this.#percentage;
  }
}

// Game-related variables and selectors
const availableWords = [...wordBank];
const time = select('.time');
const input = select('.input');
const start = select('.start');
const hits = select('.hits');
const display = select('.display');
const hitCounter = select('.hit-counter');
const options = { month: 'short', day: 'numeric', year: 'numeric' };
const scoreboard = select('.scoreboard');
const scoreUl = select('.scoreboard ul');
let score = {};

let gameStarted = false;
let timeLeft = 15;
let timerInterval;
let wordToType = '';
let correctHits = 0;
let shuffledWords = [];

const correctSound = select('#correct-sound');
const gameMusic = select('.gameMusic');

function playMusic() {
  gameMusic.play();
}

function stopMusic() {
  gameMusic.pause();
  gameMusic.currentTime = 0;
}

// Function to highlight correctly typed text
function isTextCorrect() {
  const inputValue = input.value.toLowerCase().trim();
  let displayText = wordToType.trim();
  let updatedText = '';

  for (let i = 0; i < displayText.length; i++) {
    const letter = displayText[i];
    if (inputValue[i] && inputValue[i].toLowerCase() === letter.toLowerCase()) {
      updatedText += `<span style="color: #08c008;">${letter}</span>`;
    } else {
      updatedText += letter;
    }
  }

  display.innerHTML = updatedText;
}

function startGame() {
  time.style.opacity = 0;
  setTimeout(() => {
    time.style.opacity = 1;
  }, 200);

  if (gameStarted) {
    clearInterval(timerInterval);
  }

  gameStarted = true;
  input.disabled = false;
  input.style.backgroundColor = 'rgba(25, 15, 45, 0.8)';

  input.value = '';
  input.placeholder = 'Start typing...';
  start.textContent = 'RESTART';

  correctHits = 0;
  hitCounter.textContent = correctHits;
  timeLeft = 15;
  time.textContent = timeLeft;

  // I am using the Fisher-Yates shuffle algorithm to randomly shuffle an array
  // This algorithm is better than using Math.random() - 0.5 directly because 
  // it ensures an unbiased shuffle, meaning each possible permutation of the 
  // array is equally likely. It is also more efficient than using 
  // sort() method.
  shuffledWords = shuffleArray([...wordBank]);
  wordToType = shuffledWords.pop();
  display.textContent = wordToType;

  input.focus();
  playMusic();

  timerInterval = setInterval(function () {
    timeLeft--;
    time.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function restartGame() {
  hitCounter.textContent = 0;
  correctHits = 0;
  input.placeholder = 'Restarting...';
  input.style.backgroundColor = '#ca6262';
  time.innerText = '---';
  display.innerText = '';

  input.disabled = false;
  time.style.opacity = 0;
  stopMusic();
}

function gameOver() {
  if (correctHits > 0) {
    setScore();
  }
  correctHits = 0;
  updateScoreboard();
  time.innerText = '---';
  input.disabled = true;
  input.value = '';
  input.placeholder = 'Game Over!';
  start.textContent = 'START';
  input.style.backgroundColor = '#ca6262';
  gameStarted = false;
  display.textContent = '';

  stopMusic();
}

function setScore() {
  const newScore = {
    date: new Date().toLocaleString('en-US', options),
    hits: correctHits.toString().padStart(2, '0') 
  };

  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  scores.push(newScore);
  
  localStorage.setItem('scores', JSON.stringify(scores));
}

function updateScoreboard() {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];
  
  if (scores.length > 0) {
    scoreboard.classList.remove('hidden');
    
    scores.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const topScores = scores.slice(0, 9);

    scoreUl.innerHTML = '';

    topScores.forEach((score, index) => {
      scoreUl.innerHTML += `<li>#${index + 1} ${score.hits} Hits, ${score.date}</li>`;
    });
  }
}

// Event listener for the start button (to start or restart the game)
listen('click', start, function () {
  if (gameStarted) {
    correctHits = 0;
    restartGame();
    setTimeout(() => {
      startGame();
    }, 2000);
  } else {
    correctHits = 0;
    startGame();
  }
});

// Event listener for user input to check if the typed word is correct
listen('keyup', input, function () {
  isTextCorrect();

  if (input.value.toLowerCase().trim() === wordToType.toLowerCase().trim()) {
    correctHits++;
    hitCounter.textContent = correctHits;
    correctSound.play();

    if (shuffledWords.length > 0) {
      wordToType = shuffledWords.pop();
      display.textContent = wordToType;
      input.value = '';
      input.focus();
    } else {
      gameOver();
    }
  }
});

listen('DOMContentLoaded', document, function() {
  updateScoreboard();
});

// localStorage.clear(); // Uncomment to clear localStorage for testing
