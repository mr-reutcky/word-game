'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const wordBank = [
  'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
  'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
  'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
  'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
  'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone',
  'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
  'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze',
  'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology',
  'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
  'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
  'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown',
  'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
  'beach', 'economy', 'interview', 'awesome', 'challenge', 'science',
  'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software',
  'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep',
  'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary',
  'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil',
  'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
  'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort',
  'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media',
  'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond',
  'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon',
  'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust',
  'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony',
  'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision',
  'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet',
  'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo',
  'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure',
  'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle',
  'film', 'jupiter'
  ];

const availableWords = [...wordBank];

const time = select('.time');
const input = select('.input');
const start = select('.start');
const hits = select('.hits');
const display = select('.display');
const hitCounter = select('.hit-counter');

let gameStarted = false;
let timeLeft = 99;
let timerInterval;
let wordToType = '';
let correctHits = 0;

const correctSound = select('#correct-sound');

const gameMusic = select('.gameMusic');

function playMusic() {
  gameMusic.play();
}

function stopMusic() {
  gameMusic.pause();
  gameMusic.currentTime = 0;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomWord(array) {
  const randomIndex = getRandomNumber(0, array.length - 1);
  const pickedWord = array[randomIndex];
  array.splice(randomIndex, 1);
  return pickedWord;
}

function updateDisplay() {
  const inputValue = input.value.toLowerCase();
  let displayText = wordToType;

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
    availableWords.length = 0;
    availableWords.push(...wordBank);
  }

  gameStarted = true;
  input.disabled = false;
  input.style.backgroundColor = '#5f4b8b';

  input.value = '';
  input.placeholder = 'Type the word...';
  start.textContent = 'RESTART';

  correctHits = 0;
  hitCounter.textContent = correctHits;
  timeLeft = 99;
  time.textContent = timeLeft;

  wordToType = pickRandomWord(availableWords);
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
  input.placeholder = 'Restarting...';
  input.style.backgroundColor = '#ca6262';
  time.innerText = '---';
  display.innerText = '';

  input.disabled = false;

  stopMusic();
  time.style.opacity = 0;
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
  updateDisplay();

  if (input.value.toLowerCase() === wordToType.toLowerCase()) {
    correctHits++;
    hitCounter.textContent = correctHits;
    correctSound.play();

    if (availableWords.length > 0) {
      wordToType = pickRandomWord(availableWords);
      display.textContent = wordToType;
      input.value = '';
      input.focus();
    } else {
      gameOver();
    }
  }
});
