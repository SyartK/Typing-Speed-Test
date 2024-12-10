const textToType = document.getElementById('text-to-type');
const textInput = document.getElementById('text-input');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');
const timeOptions = document.querySelectorAll('input[name="time-option"]');

let timer, timeLimit, timerRunning = false;
let totalWordsTyped = 0;
let totalCorrectWords = 0;
let currentSentence = ""; 
let currentWords = []; 

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "Typing speed tests are fun and challenging.",
  "Practice makes perfect, so keep typing!",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Imagination is more important than knowledge.",
  "An eye for an eye only ends up making the whole world blind.",
  "Be the change that you wish to see in the world.",
  "I think, therefore I am." ,
  "The only thing we have to fear is fear itself.",
  "To infinity and beyond!",
 "Life is like a box of chocolates. You never know what you're gonna get.",
  "Just keep swimming.",
  "I feel the need – the need for speed!",
  "Why so serious?",
  "You can't handle the truth!" ,
  "Here's looking at you, kid." ,
  "Not all those who wander are lost." ,
  "It was the best of times, it was the worst of times." ,
  "The scar had not pained Harry for 19 years. All was well.",
];

function initializeTest() {

  const selectedOption = document.querySelector('input[name="time-option"]:checked');
  timeLimit = parseInt(selectedOption.value); 

  resetTest();
}

function resetTest() {
  clearInterval(timer); 
  timerRunning = false;

  loadNewSentence();

  textInput.value = '';
  wpmDisplay.textContent = 'Words per Minute: 0';
  accuracyDisplay.textContent = 'Accuracy: 0%';
  timerDisplay.textContent = `Time Left: ${timeLimit}s`;

  totalWordsTyped = 0;
  totalCorrectWords = 0;

  textInput.disabled = false;

  textInput.addEventListener('input', handleTyping);
  textInput.addEventListener('keydown', handleEnterKey);
}

function loadNewSentence() {
  const randomIndex = Math.floor(Math.random() * texts.length);
  currentSentence = texts[randomIndex];
  currentWords = currentSentence.split(' ');
  textToType.textContent = currentSentence;
}

function handleTyping() {
  if (!timerRunning) {
    startTimer();
    timerRunning = true;
  }

  const inputText = textInput.value.trim();
  const typedWords = inputText.split(' ');

  const highlightedText = currentWords.map((word, index) => {
    if (typedWords[index] !== word) {
      return `<span style="color: red;">${word}</span>`;
    }
    return word;
  }).join(' ');

  textToType.innerHTML = highlightedText;
}

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    const inputText = textInput.value.trim();
    const typedWords = inputText.split(' ');

    if (inputText === currentSentence.trim()) {
      totalWordsTyped += currentWords.length;
      totalCorrectWords += currentWords.length; 
      textInput.value = '';
      loadNewSentence(); 
    }
  }
}

function startTimer() {
  let timeLeft = timeLimit;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function endTest() {
  textInput.disabled = true;
  calculateResults();
}

function calculateResults() {
  const elapsedTime = timeLimit / 60;

  const wpm = Math.round(totalWordsTyped / elapsedTime);

  const accuracy = Math.round((totalCorrectWords / totalWordsTyped) * 100) || 0;

  wpmDisplay.textContent = `Words per Minute: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

timeOptions.forEach(option => {
  option.addEventListener('change', initializeTest);
});

restartButton.addEventListener('click', () => {
  resetTest(); 
});

document.addEventListener('DOMContentLoaded', initializeTest);
