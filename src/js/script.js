'use strict';

import { wordBank } from './word-bank.js';
import { select, listen, getRandomNumber } from './utils.js';

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

const availableWords = [...wordBank];

const time = select('.time');
const input = select('.input');
const start = select('.start');
const hits = select('.hits');
const display = select('.display');
const hitCounter = select('.hit-counter');

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

  shuffledWords = [...wordBank].sort(() => Math.random() - 0.5);
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

function gameOver() {
  const score = new Score(new Date(), correctHits, correctHits);
  console.log(score);
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

function restartGame() {
  const score = new Score(new Date(), correctHits, correctHits);
  console.log(score);
  input.placeholder = 'Restarting...';
  input.style.backgroundColor = '#ca6262';
  time.innerText = '---';
  display.innerText = '';

  input.disabled = false;
  time.style.opacity = 0;
  stopMusic();
}

listen('click', start, function () {
  if (gameStarted) {
    restartGame();
    setTimeout(() => {
      startGame();
    }, 2000);
  } else {
    startGame();
  }
});

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
