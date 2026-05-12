// DOM Elements
const quoteBox = document.getElementById("quote-box");
const inputField = document.getElementById("input-field");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timerDisplay = document.getElementById("timer");
const resultScreen = document.getElementById("result-screen");
const restartBtn = document.getElementById("restart-btn");
const finalWpm = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");
const finalCorrect = document.getElementById("final-correct");
const finalErrors = document.getElementById("final-errors");

// Quotes
const quotes = [
  "Any fool can write code that a computer can understand but good programmers write code that humans can understand. - Martin Fowler",
  "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
  "Premature optimization is the root of all evil. - Donald Knuth",
  "One of my most productive days was throwing away 1000 lines of code. - Ken Thompson",
  "A problem well stated is a problem half solved. - Charles Kettering",
  "Most good programmers do programming not because they expect to get paid but because it is fun to program. - Linus Torvalds",
  "I am not a great programmer I am just a good programmer with great habits. - Kent Beck",
  "A language that does not affect the way you think about programming is not worth knowing. - Alan Perlis",
];

// State Variables
let currentQuote = "";
let timeLeft = 60;
let timerInterval = null;
let started = false;
let correctChars = 0;
let totalTyped = 0;
let errors = 0;
let totalTypedAllTime = 0;
let correctCharsAllTime = 0;

// Load a random quote and render each character as a span
function loadQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];
  quoteBox.innerHTML = "";

  // Loop through each character in the quote
  // Create a span so they can be coloured individually as the user types
  currentQuote.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.classList.add("char");
    span.textContent = char;
    if (index === 0) {
        span.classList.add("active");
    }
    quoteBox.appendChild(span);
  });
}

// Start the countdown timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Calculate WPM live
function updateWpm() {
  const wordsTyped = correctChars / 5;
  const minutesElapsed = (60 - timeLeft) / 60;
  const wpm = minutesElapsed > 0 ? Math.round(wordsTyped / minutesElapsed) : 0;
  wpmDisplay.textContent = wpm;
}

// Calculate accuracy live
function updateAccuracy() {
  const total = totalTypedAllTime + totalTyped;
  if (total === 0) return;
  const acc = Math.round(((correctCharsAllTime + correctChars) / total) * 100);
  accuracyDisplay.textContent = acc + "%";
}

// Listen for user input and handle typing logic
inputField.addEventListener("input", () => {

  // Start timer on first keystroke
  if (!started) {
    started = true;
    startTimer();
  }

  const typedValue = inputField.value;
  const chars = quoteBox.querySelectorAll(".char");

  totalTyped = typedValue.length;
  correctChars = 0;

  // Loop through each character and colour it based on whether it is correct or not
  chars.forEach((span, index) => {
    span.classList.remove("correct", "incorrect", "active");

    if (index < typedValue.length) {
      if (typedValue[index] === currentQuote[index]) {
        span.classList.add("correct");
        correctChars++;
      } else {
        span.classList.add("incorrect");
      }
    } else if (index === typedValue.length) {
      span.classList.add("active");
    }
  });

  // Count total errors
  errors = 0;
  for (let i = 0; i < typedValue.length; i++) {
    if (typedValue[i] !== currentQuote[i]) {
      errors++;
    }
  }

  updateWpm();
  updateAccuracy();

  // Move to next quote when current one is completed
  if (typedValue === currentQuote) {
    totalTypedAllTime += totalTyped;
    correctCharsAllTime += correctChars;
    inputField.value = "";
    loadQuote();
  }
});

// Start game
loadQuote();