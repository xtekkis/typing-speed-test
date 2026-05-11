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

// State Variables
let currentQuote = "";
let timeLeft = 60;
let timerInterval = null;
let started = false;
let correctChars = 0;
let totalTyped = 0;
let errors = 0;

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

// Start the game
loadQuote();