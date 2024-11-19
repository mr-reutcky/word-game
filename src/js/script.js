'use strict';

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

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const wordBank = [
  'dinosaur', 'fossil', 'prehistoric', 'extinct', 'jurassic', 'reptile', 'love',
  'affection', 'romance', 'adoration', 'pineapple', 'fruit', 'tropical', 'calendar',
  'schedule', 'planner', 'timeline', 'robot', 'android', 'automation', 'cyborg',
  'building', 'structure', 'skyscraper', 'architecture', 'population', 'people',
  'demographics', 'community', 'weather', 'climate', 'forecast', 'storm', 'bottle',
  'container', 'flask', 'vessel', 'history', 'past', 'chronicle', 'heritage',
  'dream', 'vision', 'aspiration', 'fantasy', 'character', 'personality', 'protagonist',
  'figure', 'money', 'currency', 'wealth', 'cash', 'absolute', 'total', 'complete',
  'definitive', 'discipline', 'focus', 'control', 'study', 'machine', 'device',
  'mechanism', 'automation', 'accurate', 'precise', 'correct', 'exact', 'connection',
  'link', 'relation', 'network', 'rainbow', 'spectrum', 'arc', 'colors', 'bicycle',
  'bike', 'cycle', 'ride', 'eclipse', 'shadow', 'obscuration', 'alignment',
  'calculator', 'computation', 'device', 'tool', 'trouble', 'problem', 'difficulty',
  'challenge', 'watermelon', 'fruit', 'melon', 'refreshing', 'developer', 'programmer',
  'coder', 'creator', 'philosophy', 'wisdom', 'belief', 'logic', 'database', 'storage',
  'repository', 'records', 'periodic', 'cyclic', 'repeated', 'intermittent',
  'capitalism', 'economy', 'market', 'profit', 'abominable', 'terrible', 'horrible',
  'monstrous', 'phone', 'telephone', 'mobile', 'device', 'component', 'part',
  'element', 'piece', 'future', 'tomorrow', 'destiny', 'ahead', 'pasta', 'noodles',
  'spaghetti', 'macaroni', 'microwave', 'oven', 'heat', 'wave', 'jungle', 'forest',
  'wild', 'rainforest', 'wallet', 'purse', 'billfold', 'money holder', 'canada',
  'maple', 'country', 'nation', 'velvet', 'fabric', 'soft', 'smooth', 'potion',
  'elixir', 'brew', 'tonic', 'treasure', 'gold', 'jewels', 'fortune', 'beacon',
  'light', 'signal', 'guide', 'labyrinth', 'maze', 'puzzle', 'network', 'whisper',
  'murmur', 'hush', 'secrets', 'breeze', 'wind', 'gust', 'zephyr', 'coffee',
  'espresso', 'latte', 'brew', 'beauty', 'charm', 'grace', 'attraction', 'agency',
  'organization', 'company', 'service', 'chocolate', 'cocoa', 'dessert', 'sweet',
  'eleven', 'number', 'digit', 'sequence', 'technology', 'innovation', 'electronics',
  'devices', 'alphabet', 'letters', 'script', 'symbols', 'knowledge', 'wisdom',
  'learning', 'information', 'magician', 'wizard', 'illusionist', 'sorcerer',
  'professor', 'teacher', 'educator', 'scholar', 'triangle', 'shape', 'geometry',
  'trio', 'earthquake', 'tremor', 'seismic', 'shock', 'baseball', 'sport', 'game',
  'bat', 'beyond', 'further', 'outside', 'limit', 'evolution', 'progress', 'growth',
  'development', 'banana', 'fruit', 'yellow', 'tropical', 'perfume', 'fragrance',
  'scent', 'aroma', 'computer', 'PC', 'laptop', 'system', 'butterfly', 'insect',
  'wings', 'flutter', 'discovery', 'exploration', 'find', 'invention', 'ambition',
  'drive', 'goal', 'aspiration', 'music', 'melody', 'sound', 'harmony', 'eagle',
  'bird', 'raptor', 'soar', 'crown', 'tiara', 'monarch', 'jewel', 'chess', 'game',
  'strategy', 'board', 'laptop', 'computer', 'notebook', 'device', 'bedroom',
  'room', 'space', 'sleep', 'delivery', 'shipment', 'parcel', 'dispatch', 'enemy',
  'foe', 'opponent', 'adversary', 'button', 'switch', 'control', 'click',
  'door', 'entrance', 'gateway', 'exit', 'bird', 'avian', 'feathered', 'winged',
  'superman', 'hero', 'icon', 'legend', 'library', 'books', 'collection',
  'archive', 'unboxing', 'opening', 'revealing', 'package', 'bookstore',
  'shop', 'store', 'reading', 'language', 'speech', 'dialect', 'words',
  'homework', 'assignment', 'task', 'study', 'beach', 'sand', 'coast', 'waves',
  'economy', 'finance', 'market', 'trade', 'interview', 'question', 'meeting',
  'job', 'awesome', 'great', 'amazing', 'fantastic', 'challenge', 'task',
  'test', 'difficulty', 'science', 'study', 'research', 'experiment', 'mystery',
  'puzzle', 'unknown', 'enigma', 'famous', 'notable', 'renowned', 'celebrity',
  'league', 'team', 'group', 'association', 'memory', 'recollection', 'reminder',
  'recall', 'leather', 'fabric', 'hide', 'material', 'planet', 'world',
  'sphere', 'orb', 'software', 'program', 'application', 'system', 'update',
  'upgrade', 'patch', 'refresh', 'yellow', 'color', 'bright', 'hue', 'keyboard',
  'keys', 'input', 'device', 'window', 'pane', 'glass', 'view', 'beans',
  'seeds', 'legumes', 'crop', 'truck', 'vehicle', 'lorry', 'transport',
  'sheep', 'animal', 'wool', 'flock', 'blossom', 'flower', 'bloom', 'petals',
  'secret', 'mystery', 'confidential', 'hidden', 'wonder', 'amazement',
  'curiosity', 'awe', 'enchantment', 'magic', 'spell', 'charm',
  'destiny', 'fate', 'future', 'path', 'quest', 'journey', 'adventure',
  'mission', 'sanctuary', 'refuge', 'safe haven', 'asylum', 'download',
  'transfer', 'file', 'save', 'blue', 'color', 'sky', 'hue', 'actor', 'performer',
  'artist', 'thespian', 'desk', 'table', 'workspace', 'furniture', 'watch',
  'timepiece', 'observe', 'view', 'giraffe', 'animal', 'tall', 'wildlife',
  'brazil', 'country', 'nation', 'soccer', 'audio', 'sound', 'speaker',
  'waves', 'school', 'education', 'institution', 'class', 'detective',
  'investigator', 'sleuth', 'inspector', 'hero', 'savior', 'champion',
  'idol', 'progress', 'advancement', 'growth', 'development', 'winter',
  'cold', 'snow', 'season', 'passion', 'enthusiasm', 'drive', 'desire',
  'rebel', 'revolt', 'uprising', 'nonconformist', 'amber', 'color', 'resin',
  'gemstone', 'jacket', 'coat', 'clothing', 'outerwear', 'article', 'piece',
  'item', 'document', 'paradox', 'contradiction', 'irony', 'riddle',
  'social', 'community', 'public', 'network', 'resort', 'vacation',
  'retreat', 'destination', 'mask', 'cover', 'disguise', 'veil',
  'escape', 'flee', 'evade', 'freedom', 'promise', 'vow', 'pledge',
  'commitment', 'band', 'group', 'ensemble', 'loop', 'level', 'plane',
  'tier', 'stage', 'hope', 'faith', 'belief', 'optimism', 'moonlight',
  'lunar', 'night', 'glow', 'media', 'news', 'press', 'communication',
  'orchestra', 'band', 'music', 'ensemble', 'volcano', 'eruption',
  'lava', 'mountain', 'guitar', 'instrument', 'strings', 'music',
  'raindrop', 'water', 'rain', 'drop', 'inspiration', 'motivation',
  'spark', 'idea', 'diamond', 'gem', 'jewel', 'sparkle', 'illusion',
  'trick', 'mirage', 'deception', 'firefly', 'insect', 'glow',
  'light', 'ocean', 'sea', 'waves', 'depth', 'cascade', 'waterfall',
  'flow', 'stream', 'journey', 'trip', 'voyage', 'adventure',
  'laughter', 'joy', 'humor', 'giggle', 'horizon', 'skyline',
  'view', 'vista', 'exploration', 'adventure', 'discovery',
  'investigation', 'serendipity', 'chance', 'fortune', 'luck',
  'infinity', 'eternity', 'endless', 'boundless', 'silhouette',
  'outline', 'shadow', 'profile', 'wanderlust', 'travel', 'explore',
  'adventure', 'marvel', 'wonder', 'astonishment', 'awe', 'nostalgia',
  'reminisce', 'memory', 'past', 'serenity', 'calm', 'peace',
  'tranquility', 'reflection', 'thought', 'mirror', 'image',
  'twilight', 'dusk', 'evening', 'sunset', 'harmony', 'accord',
  'balance', 'peace', 'symphony', 'music', 'orchestra', 'composition',
  'solitude', 'isolation', 'alone', 'peace', 'essence', 'spirit',
  'core', 'soul', 'melancholy', 'sadness', 'gloom', 'sorrow',
  'melody', 'tune', 'song', 'harmony', 'vision', 'sight', 'dream',
  'imagination', 'silence', 'quiet', 'calm', 'stillness', 'whimsical',
  'fanciful', 'playful', 'imaginative', 'eternity', 'forever',
  'infinity', 'timeless', 'cathedral', 'church', 'temple', 'architecture',
  'embrace', 'hug', 'hold', 'acceptance', 'poet', 'writer', 'lyricist',
  'author', 'ricochet', 'bounce', 'rebound', 'deflect', 'mountain',
  'peak', 'summit', 'hill', 'dance', 'movement', 'rhythm', 'celebration',
  'sunrise', 'dawn', 'morning', 'light', 'dragon', 'myth', 'serpent',
  'fire', 'adventure', 'journey', 'quest', 'experience', 'galaxy',
  'stars', 'space', 'universe', 'echo', 'reverberation', 'resonance',
  'sound', 'fantasy', 'imagination', 'dream', 'fiction', 'radiant',
  'bright', 'glowing', 'shining', 'serene', 'calm', 'peaceful', 'tranquil',
  'legend', 'myth', 'tale', 'hero', 'starlight', 'night', 'shine',
  'light', 'light', 'glow', 'shine', 'brightness', 'pressure', 'force',
  'strain', 'tension', 'bread', 'loaf', 'slice', 'dough', 'cake',
  'dessert', 'baking', 'sweet', 'caramel', 'syrup', 'candy', 'flavor',
  'juice', 'drink', 'beverage', 'squeeze', 'mouse', 'rodent', 'cursor',
  'device', 'charger', 'adapter', 'power', 'cable', 'pillow', 'cushion',
  'support', 'comfort', 'candle', 'wax', 'light', 'flame', 'film',
  'movie', 'cinema', 'reel', 'jupiter', 'planet', 'gas giant', 'solar system'
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
    availableWords.length = 0;
    availableWords.push(...wordBank);
  }

  gameStarted = true;
  input.disabled = false;
  input.style.backgroundColor = 'rgba(25, 15, 45, 0.8)';

  input.value = '';
  input.placeholder = 'Start typing...';
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
