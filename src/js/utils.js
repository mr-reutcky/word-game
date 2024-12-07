export function select(selector, scope = document) {
  return scope.querySelector(selector);
}

export function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fisher-Yates shuffle algorithm to randomly shuffle an array
// This algorithm is better than using Math.random() directly because 
// it ensures an unbiased shuffle, meaning each possible permutation of the 
// array is equally likely.

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}