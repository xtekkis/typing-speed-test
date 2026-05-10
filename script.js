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